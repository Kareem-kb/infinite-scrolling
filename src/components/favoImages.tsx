import { useState, useEffect } from 'react';
import styles from '../styles/favoriteImages.module.css';
import { Images } from '../helper/types';

// Favorite images component
const FavoriteImages = () => {
  const [favorites, setFavorites] = useState<Images[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem('favort');
      if (data) setFavorites(JSON.parse(data));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Remove favorite image
  const handleRemoveFavorite = (imageId: string) => {
    const updatedFavorites = favorites.filter((image) => image.id !== Number(imageId));
    setFavorites(updatedFavorites);
    localStorage.setItem('favort', JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.favoriteImagesContainer}>
      {favorites.length === 0 ? (
        <p className={styles.noFavoritesMessage}>
          No favorite images yet
        </p>
      ) : (
        <ul className={styles.favoriteImagesList}>
          {favorites.map((image) => (
            <li key={image.id} className={styles.favoriteImageItem}>
              <picture>
                <source media="(min-width: 1024px)" srcSet={image.src.large2x} />
                <source media="(min-width: 768px)" srcSet={image.src.large} />
                <source media="(max-width: 767px)" srcSet={image.src.medium} />
                <img
                  src={image.src.medium}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className={styles.favoriteImage}
                />
              </picture>
              <div className={styles.overlay}>
                <h1>{image.photographer}</h1>
                <p>{image.alt}</p>
                <button
                  aria-label="Remove from favorites"
                  className={styles.favoriteButton}
                  onClick={() => handleRemoveFavorite(image.id.toString())}
                >
                  Remove Favorite
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteImages;
