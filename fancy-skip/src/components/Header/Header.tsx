import React from 'react';
import styles from './Header.module.css';
import MapPinIcon from '../../assets/map-pin.svg?react';
import TrashIcon from '../../assets/trash.svg?react';
import TruckIcon from '../../assets/truck.svg?react';
import ShieldIcon from '../../assets/shield.svg?react';
import CalendarIcon from '../../assets/calendar.svg?react';
import CreditCardIcon from '../../assets/credit-card.svg?react';

const steps = [
    { name: 'Postcode', Icon: MapPinIcon },
    { name: 'Waste Type', Icon: TrashIcon },
    { name: 'Select Skip', Icon: TruckIcon },
    { name: 'Permit Check', Icon: ShieldIcon },
    { name: 'Choose Date', Icon: CalendarIcon },
    { name: 'Payment', Icon: CreditCardIcon },
];

const Header: React.FC = () => {
    const activeStepIndex = 2; // "Select Skip"

    return (
        <header className={styles.header}>
            <div className={styles.progressContainer}>
                {steps.map((step, index) => {
                    const isCompleted = index < activeStepIndex;
                    const isCurrent = index === activeStepIndex;
                    return (
                        <div key={step.name} className={`${styles.step} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''}`}>
                            <div className={styles.iconWrapper}><step.Icon /></div>
                            <span>{step.name}</span>
                        </div>
                    );
                })}
            </div>
        </header>
    );
};

export default Header;