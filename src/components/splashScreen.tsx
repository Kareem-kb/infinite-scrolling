import { useEffect, useRef } from 'react';
import styles from '../styles/splash-screen.module.css';

interface SplashScreenProps {
  onLoadingComplete: () => void;
}

// SplashScreen component for the initial loading screen
const SplashScreen = ({ onLoadingComplete }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textContainer = textContainerRef.current;
    
    if (!container || !textContainer) return;

    // Start both animations after 0.5s
    const animationTimer = setTimeout(() => {
      textContainer.classList.add(styles.zoomOut);
      container.classList.add(styles.fadeOut);
    }, 500);

    // Handle completion when fade finishes (longest animation)
    const handleTransitionEnd = () => {
      onLoadingComplete();
    };

    container.addEventListener('transitionend', handleTransitionEnd);

    // skipcq: JS-0045
    return () => {
      clearTimeout(animationTimer);
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [onLoadingComplete]);

  return (
    <div ref={containerRef} className={styles.splashScreen}>
      <div ref={textContainerRef} className={styles.textContainer}>
        <h1>Vinted Academy</h1>
      </div>
    </div>
  );
};

export default SplashScreen;
