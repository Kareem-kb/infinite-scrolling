// PagesButton.tsx
import styles from '../styles/pagesButton.module.css';

interface PagesButtonProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

// Component to switch between home and favored pages
const PagesButton = ({ currentPage, onPageChange }: PagesButtonProps) => {
  return (
    <nav className={styles.container}>
      <button
        className={`${styles.button} ${currentPage === 1 ? styles.active : ''}`}
        onClick={() => onPageChange(1)}
      >
        <div className={styles.buttonContent}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className={styles.svgIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className={styles.buttonText}> Home</span>
        </div>
      </button>

      {/* skipcq: JS-0417 */}
      <button
        className={`${styles.button} ${currentPage === 2 ? styles.active : ''}`}
        onClick={() => onPageChange(2)}
      >
        <div className={styles.buttonContent}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className={styles.svgIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
            />{' '}
          </svg>
          <span className={styles.buttonText}>Favored</span>
        </div>
      </button>
    </nav>
  );
};

export default PagesButton;
