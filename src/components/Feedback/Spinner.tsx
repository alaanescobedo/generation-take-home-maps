import styles from './Spinner.module.css';

export const Spinner = () => {
  return <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={styles.spinner}>
    <circle
      cx="50" cy="50" r="30"
      fill="transparent"
      strokeWidth="8px"
      strokeDasharray="160"
    />
  </svg>
};