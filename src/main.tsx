import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { fetchCuratedPhotos } from './api/fetchImages';
import { preFetched } from './helper/preFetching.ts';

// Pre-fetching the images for the initial data
preFetched(fetchCuratedPhotos);

// skipcq: JS-0339
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
