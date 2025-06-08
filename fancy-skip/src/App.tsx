import { useState, useEffect, useMemo } from 'react';
import { useSkips } from './api/useSkips';
import Header from './components/Header/Header';
import SkipSelector from './components/SkipSelector/SkipSelector';
import SkipDetails from './components/SkipDetails/SkipDetails';
import Loader from './components/Loader/Loader';
import MobileSkipImage from './components/MobileSkipImage/MobileSkipImage';
import styles from './App.module.css';
import type { Skip } from './types';

const formatPrice = (skip: Skip): string => {
  if (skip.transport_cost) {
    return `From ${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(skip.transport_cost)}`;
  }
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(totalPrice);
};


function App() {
  const { skips, isLoading, error } = useSkips();
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);

  useEffect(() => {
    if (skips.length > 0 && selectedSkipId === null) {
      setSelectedSkipId(skips[0].id);
    }
  }, [skips, selectedSkipId]);

  const selectedSkip = useMemo<Skip | null>(() => {
    return skips.find(s => s.id === selectedSkipId) ?? null;
  }, [selectedSkipId, skips]);

  const handleContinue = () => {
    if (selectedSkip) {
      console.log("Continuing with:", selectedSkip);
      alert(`Proceeding to next step with ${selectedSkip.size} Yard Skip.`);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.selectionWrapper}>
          <h1 className={styles.title}>Choose Your Skip Size</h1>
          <p className={styles.subtitle}>Select a size from the list to see details and pricing.</p>

          {isLoading && <Loader />}
          {error && <div className={styles.error}>Error: {error}. Please refresh the page.</div>}

          {!isLoading && !error && selectedSkip && (
            <>
              <MobileSkipImage skip={selectedSkip} />

              <div className={styles.contentGrid}>
                <div className={styles.leftPanel}>
                  <SkipSelector
                    skips={skips}
                    selectedSkipId={selectedSkip?.id ?? null}
                    onSelectSkip={setSelectedSkipId}
                  />
                </div>
                <div className={styles.rightPanel}>
                  <SkipDetails
                    skip={selectedSkip}
                    onContinue={handleContinue}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {!isLoading && selectedSkip && (
        <div className={styles.mobileStickyBar}>
          <div className={styles.mobileStickyInfo}>
            <span className={styles.mobileSkipSize}>{selectedSkip.size} Yard Skip</span>
            <span className={styles.mobileSkipPrice}>{formatPrice(selectedSkip)}</span>
          </div>
          <button onClick={handleContinue} className={styles.mobileContinueButton}>Continue</button>
        </div>
      )}
    </>
  );
}

export default App;