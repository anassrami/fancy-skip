import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.loader}></div>
    <p>Finding the best prices for you...</p>
  </div>
);

export default Loader;