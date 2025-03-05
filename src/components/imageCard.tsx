import { forwardRef, useState, useEffect, useCallback } from 'react';
import { Images } from '../helper/types';

type ImageCardProps = {
  image: Images;
};

const ImageCard = forwardRef<HTMLLIElement, ImageCardProps>(
  ({ image }, ref) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // check if the image is already liked
    // when the page is reloded
    useEffect(() => {
      const favorites: Images[] = JSON.parse(
        localStorage.getItem('favort') || '[]'
      );
      setIsFavorite(favorites.some((fav) => fav.id === image.id));
    }, [image]);
    // Handle like button click
    // if the image is already liked, remove it from favorites
    // otherwise, add it to favorites
    const handleLike = useCallback(() => {
      const favorites: Images[] = JSON.parse(
        localStorage.getItem('favort') || '[]'
      );
      // check if the image is already liked for the animated Likw button
      const exists = favorites.find((fav) => fav.id === image.id);
      const updated = exists
        ? favorites.filter((fav) => fav.id !== image.id)
        : [...favorites, image];

      localStorage.setItem('favort', JSON.stringify(updated));
      setIsFavorite(!exists);
    }, [image]);

    return (
      <li ref={ref} aria-labelledby={`img-${image.id}-label`}>
        <h2 id={`img-${image.id}-label`}>
          {image.photographer}
          <span className="sr-only">&apos;s photograph</span>
        </h2>
        <picture>
          {/* Desktop (1024px+) */}
          <source media="(min-width: 1024px)" srcSet={image.src.large2x} />

          {/* Tablet (768px-1023px) */}
          <source media="(min-width: 768px)" srcSet={image.src.large} />

          {/* Mobile (<768px) */}
          <source media="(max-width: 767px)" srcSet={image.src.medium} />

          {/* Fallback */}
          <img
            src={image.src.medium}
            alt={image.alt}
            loading="lazy"
            decoding="async"
          />
        </picture>

        <button
          onClick={handleLike}
          aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
          className="favorite-button"
        >
          <span aria-hidden="true">{isFavorite ? '❤️' : '♡'}</span>
        </button>
      </li>
    );
  }
);

export default ImageCard;
