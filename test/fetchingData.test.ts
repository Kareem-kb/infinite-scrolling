import { beforeAll, describe, expect, test, vi } from 'vitest';
import { fetchCuratedPhotos } from '../src/api/fetchImages';
import '@testing-library/jest-dom';
import { Images } from '../src/helper/types';

const BEFORE_ALL_TIMEOUT = 30000;

describe('FetchCuratedPhotos API', () => {
  let response: Images[];

  beforeAll(async () => {
    response = await fetchCuratedPhotos(1);
  }, BEFORE_ALL_TIMEOUT);

  test('Should return an array of photos', () => {
    expect(response).toBeTypeOf('object');
    expect(Array.isArray(response)).toBe(true);
  });

  test('Should have 10 photos in the response', () => {
    expect(response.length).toBe(10);
  });

  test('Each photo should have required properties', () => {
    response.forEach((photo) => {
      expect(photo).toHaveProperty('id');
      expect(photo).toHaveProperty('alt');
      expect(photo).toHaveProperty('photographer');
      expect(photo.src).toHaveProperty('medium');
      expect(photo.src).toHaveProperty('large');
      expect(photo.src).toHaveProperty('large2x');
    });
  });

  test('Should throw an error on API failure', async () => {
    // Mock the fetch API to simulate an error
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    await expect(fetchCuratedPhotos(1)).rejects.toThrow('API request failed');
  });
});
