import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { preFetched, useData } from '../src/helper/preFetching';
import { Images } from '../src/helper/types';

describe('useData and preFetched', () => {
  it('should return empty data initially', () => {
    const { result } = renderHook(() => useData());
    expect(result.current).toEqual([]);
  });

  it('should update data when fetchData event is dispatched', async () => {
    const initialData: Images[] = [
      {
        id: 1,
        alt: 'Photo Alt',
        photographer: 'Photographer Name',
        src: {
          medium: 'medium.jpg',
          large: 'large.jpg',
          large2x: 'large2x.jpg',
        },
      },
    ];

    // Create a mock function that resolves with initialData
    const mockFetch = vi.fn().mockResolvedValue(initialData);

    // Render the hook to set up the event listener
    const { result } = renderHook(() => useData());

    // Execute preFetched with the mock function inside act
    await act(async () => {
      preFetched(mockFetch);
      // Wait for the promise and event to propagate
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Assert that the hook's data matches initialData
    expect(result.current).toEqual(initialData);
  });

  it('should fetch initial data with preFetched', async () => {
    const initialData: Images[] = [
      {
        id: 1,
        alt: 'Photo Alt',
        photographer: 'Photographer Name',
        src: {
          medium: 'medium.jpg',
          large: 'large.jpg',
          large2x: 'large2x.jpg',
        },
      },
    ];

    // Mock the fetch function
    const mockFetch = vi.fn().mockResolvedValue(initialData);

    await act(async () => {
      preFetched(mockFetch);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify the mock was called correctly
    expect(mockFetch).toHaveBeenCalledWith(1);
  });
});
