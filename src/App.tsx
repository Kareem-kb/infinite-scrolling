import { useState, useEffect, useRef, useCallback } from 'react';
import ImageCard from './components/imageCard';
import { fetchCuratedPhotos } from './api/fetchImages';
import { Images } from './helper/types';
import { useData } from './helper/preFetching';
import SplashScreen from './components/splashScreen';
import Loader from './components/loaderStyle';
import PagesButton from './components/pagesButton';
import FavoriteImages from './components/favoImages';

// main app component
const App = () => {
  const [step, setStep] = useState(1);
  const [showSplash, setShowSplash] = useState(true)
   const initialData = useData();
  const [data, setData] = useState<Images[]>(initialData || []);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  // const [step, setStep] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
     setTimeout(() => {
      setShowSplash(false);
      localStorage.setItem('showSplash', 'true');
    }, 2500); // Show splash screen for 2 seconds
  }, []);

  const completeSplash = useCallback(() => {
    setShowSplash(false);
  }, [setShowSplash]);
  

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(initialData);
    }
  }, [initialData]);

  // Cleanup the observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setStep(newPage);
  }, []);

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
    <>  
    {showSplash && <SplashScreen onLoadingComplete={completeSplash} />}
    <div className="gallery">
    <PagesButton currentPage={step} onPageChange={handlePageChange} />
    {step === 1 && (
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
    )} 
    {step === 2 && (
      <FavoriteImages/>
    )}
      {loading && <Loader />}
    </div>
    </>)
};

export default App;
