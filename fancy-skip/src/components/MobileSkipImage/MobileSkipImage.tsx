import React from 'react';

import { getSkipImageUrl } from '../../utils/getSkipImageUrl';
import styles from './MobileSkipImage.module.css';
import type { Skip } from '../../types';

interface MobileSkipImageProps {
    skip: Skip | null;
}

const MobileSkipImage: React.FC<MobileSkipImageProps> = ({ skip }) => {
    if (!skip) {
        return <div className={styles.imageWrapper}><div className={styles.imagePlaceholder}></div></div>;
    }

    const imageUrl = getSkipImageUrl(skip.size);

    return (
        <div className={styles.imageWrapper}>
            <img
                key={skip.id}
                src={imageUrl}
                alt={`${skip.size} Yard Skip`}
                className={styles.skipImage}
            />
        </div>
    );
};

export default MobileSkipImage;