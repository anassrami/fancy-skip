import React from 'react';
import styles from './SkipDetails.module.css';
import { getSkipImageUrl } from '../../utils/getSkipImageUrl';
import type { Skip } from '../../types';

interface SkipDetailsProps {
    skip: Skip | null;
    onContinue: () => void;
}

const SkipDetails: React.FC<SkipDetailsProps> = ({ skip }) => {
    if (!skip) {
        return <div className={styles.detailsContainer}><div className={styles.imagePlaceholder}></div></div>;
    }

    const { size, hire_period_days, price_before_vat, vat, transport_cost, per_tonne_cost } = skip;
    const totalPrice = price_before_vat * (1 + vat / 100);
    const imageUrl = getSkipImageUrl(size);

    return (
        <div className={styles.detailsContainer}>
            {/* This top part will be the scrollable area */}
            <div className={styles.scrollableContent}>
                <div className={styles.imageContainer}>
                    <img
                        key={skip.id}
                        src={imageUrl}
                        alt={`${size} Yard Skip`}
                        className={styles.skipImage}
                    />
                </div>

                <div className={styles.textContainer}>
                    <h2 className={styles.sizeHeader}>{size} Yard Skip</h2>

                    <div className={styles.priceSection}>
                        {transport_cost && per_tonne_cost ? (
                            <>
                                <span className={styles.price}>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(transport_cost)}</span>
                                <span className={styles.priceDetail}>transport + {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(per_tonne_cost)} per tonne</span>
                            </>
                        ) : (
                            <span className={styles.price}>
                                {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(totalPrice)}
                            </span>
                        )}
                    </div>

                    <div className={styles.hirePeriod}>Standard {hire_period_days} day hire period</div>
                </div>
            </div>


        </div>
    );
};

export default SkipDetails;