import React from 'react';
import { FAQCard } from '../FAQCard';
import styles from './FAQSection.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  onButtonClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ items, onButtonClick }) => {
  return (
    <div className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.faqTitle}>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
        
        <div className={styles.faqGrid}>
          {items.map((item, index) => (
            <FAQCard
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <div className={styles.faqButtonWrapper}>
          <button 
            className={styles.learnMoreButton}
            onClick={onButtonClick}
          >
            УЗНАТЬ БОЛЬШЕ
          </button>
        </div>
      </div>
    </div>
  );
};