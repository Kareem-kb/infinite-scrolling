import { Images } from '../helper/types';

export const fetchCuratedPhotos = async (page: number) => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?per_page=10&page=${page}`,
      {
        headers: {
          Authorization:
            'FDT9mnj7XAm7kE4QLk48YQZZXbfrBpz5oCMj7L0g8c6ogNf4SVeiugSi',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const finalPhotos = data.photos.map((photo: Images) => {
      return {
        id: photo.id,
        alt: photo.alt,
        photographer: photo.photographer,
        src: {
          medium: photo.src.medium, // Dynamically selecting the size
          large: photo.src.large,
          large2x: photo.src.large2x,
        },
      };
    });

    return finalPhotos;
  } catch (error) {
    console.error('Error fetching curated photos:', error);
    throw new Error('API request failed');
  }
};
