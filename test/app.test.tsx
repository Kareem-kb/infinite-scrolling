// skipcq: JS-W1028
import React from 'react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { useData } from '../src/helper/preFetching';

// Minimal mocks
vi.mock('../src/helper/preFetching', () => ({
  useData: vi.fn(() => []),
}));

describe('App Component - Critical Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Basic IntersectionObserver mock
    global.IntersectionObserver = vi.fn().mockReturnValue({
      observe: vi.fn(),
      disconnect: vi.fn(),
    });
  });

  it('shows title and initial images', () => {
    // Mock initial data
    (useData as Mock).mockReturnValue([
      {
        id: 1,
        alt: 'Test Image',
        photographer: 'Test Photographer',
        src: { medium: 'medium.jpg' },
      },
    ]);

    render(<App />);

    expect(screen.getByText('Infinite Scroll')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });

  it('sets up intersection observer for last image', () => {
    const mockData = Array(3).fill({
      id: 1,
      alt: 'Test Image',
      photographer: 'Test Photographer',
      src: { medium: 'medium.jpg' },
    });

    (useData as Mock).mockReturnValue(mockData);
    render(<App />);

    // Verify observer was created
    expect(global.IntersectionObserver).toHaveBeenCalled();
  });

  it('cleans up observer on unmount', () => {
    let disconnectCalled = false;
    const originalIntersectionObserver = global.IntersectionObserver;

    global.IntersectionObserver = vi.fn().mockImplementation(() => {
      const observer = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(() => {
          disconnectCalled = true;
        }),
      };
      return observer;
    });

    const { unmount } = render(<App />);
    unmount();

    expect(disconnectCalled).toBe(true);

    // Restore the original IntersectionObserver
    global.IntersectionObserver = originalIntersectionObserver;
  });
});
