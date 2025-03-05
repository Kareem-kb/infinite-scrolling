import { useState } from 'react';
import { Images } from './types';

let storedDate: Images[] = [];

// useData is a custom hook that listens for the 'fetchData' event.
// When triggered, it updates its state with the value of 'storedDate', making it reactive.
export function useData() {
  const [data, setData] = useState<Images[]>([]);
  window.addEventListener('fetchData', () => {
    setData(storedDate);
  });
  return data;
}

// preFetched accepts a fetching function (fn) and fetches initial data for page 1.
// The fetched data is stored in 'storedDate' and triggers a 'fetchData' event,
// notifying listeners like 'useData' about new data availability.
export function preFetched(fn: (page: number) => Promise<Images[]>) {
  fn(1).then((data) => {
    storedDate = data;
    window.dispatchEvent(new Event('fetchData'));
  });
}
