import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import ImageCard from '../src/components/imageCard';
import type { Images } from '../src/helper/types';

describe('ImageCard Component', () => {
  const mockImage: Images = {
    id: 123,
    alt: 'Test Image',
    photographer: 'Test Photographer',
    src: {
      medium: 'medium.jpg',
      large: 'large.jpg',
      large2x: 'large2x.jpg',
    },
  };

  beforeEach(() => {
    Storage.prototype.getItem = vi.fn();
    Storage.prototype.setItem = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders image and photographer info', () => {
    render(<ImageCard image={mockImage} ref={null} />);

    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
    expect(screen.getByText('Test Photographer')).toBeInTheDocument();
  });

  it('toggles favorite state on button click', () => {
    const storage: Record<string, string> = {};

    // Mock localStorage to track changes
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(
      (key) => storage[key] || null
    );
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
      storage[key] = value;
    });

    render(<ImageCard image={mockImage} ref={null} />);
    const button = screen.getByRole('button');

    // First click - add to favorites
    act(() => {
      fireEvent.click(button);
    });
    expect(button).toHaveTextContent('Favored');

    // Second click - remove from favorites
    act(() => {
      fireEvent.click(button);
    });
    expect(button).toHaveTextContent('Favorite');
  });

  it('shows correct initial favorite state', () => {
    // Mock existing favorite
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify([mockImage])
    );

    render(<ImageCard image={mockImage} ref={null} />);

    expect(screen.getByText('Favored')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Remove from favorites'
    );
  });

  it('handles empty localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(<ImageCard image={mockImage} ref={null} />);

    expect(screen.getByText('Favorite')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Add to favorites'
    );
  });
});
