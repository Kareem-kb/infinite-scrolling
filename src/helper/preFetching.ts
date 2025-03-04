import { useState } from 'react';
import { Images } from './types';

let storedDate: Images[] = [];

export function useData() {
  const [data, setData] = useState<Images[]>([]);
  window.addEventListener('fetchData', () => {
    setData(storedDate);
  });
  return data;
}

export function preFetched(fn: (page: number) => Promise<Images[]>) {
  fn(1).then((data) => {
    storedDate = data;
    window.dispatchEvent(new Event('fetchData'));
  });
}
