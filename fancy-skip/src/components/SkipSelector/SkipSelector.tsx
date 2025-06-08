import React from 'react';
import styles from './SkipSelector.module.css';
import type { Skip } from '../../types';

interface SkipSelectorProps {
    skips: Skip[];
    selectedSkipId: number | null;
    onSelectSkip: (id: number) => void;
}

const formatPrice = (skip: Skip): string => {
    const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(totalPrice);
};

const SkipSelector: React.FC<SkipSelectorProps> = ({ skips, selectedSkipId, onSelectSkip }) => {
    return (
        <div className={styles.selectorContainer}>
            <ul className={styles.skipList}>
                {skips.map(skip => (
                    <li key={skip.id}>
                        <button
                            className={`${styles.skipButton} ${skip.id === selectedSkipId ? styles.active : ''}`}
                            onClick={() => onSelectSkip(skip.id)}
                            aria-pressed={skip.id === selectedSkipId}
                        >
                            <span className={styles.size}>{skip.size} Yard</span>
                            <span className={styles.price}>{skip.transport_cost ? `From £${skip.transport_cost}` : formatPrice(skip)}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SkipSelector;