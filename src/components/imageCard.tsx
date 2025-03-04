import { forwardRef } from 'react';
import { Images } from '../helper/types';

type ImageCardProps = {
  image: Images;
};

const ImageCard = forwardRef<HTMLLIElement, ImageCardProps>(
  ({ image }, ref) => {
    return (
      <li ref={ref}>
        <h2>{image.photographer}</h2>
        <img src={image.src.medium} alt={image.alt} />
      </li>
    );
  }
);

export default ImageCard;
