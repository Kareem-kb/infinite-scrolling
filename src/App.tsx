import { useState, useRef, useCallback, useEffect } from 'react';
import ImageCard from './components/imageCard';
import { fetchCuratedPhotos } from './api/fetchImages';
import { Images } from './helper/types';
import { useData } from './helper/preFetching';

const App = () => {
  // assign the initial data to the `data` state
  const initialData = useData();
  const [data, setData] = useState<Images[]>(initialData || []);
  // Set the initial page to 2 as the first page is already loaded
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set initial data to data only once when `intiData` is available
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(initialData);
    }
  }, [initialData]);

  // Load more images by fetching when the user scrolls to the bottom of the page
  const loadMoreImages = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newPosts = await fetchCuratedPhotos(page);
      setData((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  // Callback function to set the last image reference
  const lastImageRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading || !node) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) loadMoreImages();
      });
      observerRef.current.observe(node);
    },
    [loadMoreImages, loading]
  );

  return (
    <div className="gallery">
      <h1>Home page</h1>
      <ul>
        {data.map((image, index) => (
          <ImageCard
            // skipcq: JS-0437
            key={index}
            image={image}
            ref={index === data.length - 1 ? lastImageRef : null}
          />
        ))}
      </ul>
      {loading && <p>Loading more...</p>}
    </div>
  );
};

export default App;
