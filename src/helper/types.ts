export type Images = {
  id: number;
  alt: string;
  photographer?: string;
  src: {
    medium: string;
    large: string;
    large2x: string;
  };
};
