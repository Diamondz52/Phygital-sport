import React from 'react';
import styles from './FAQCard.module.scss';

interface FAQCardProps {
  question: string;
  answer: string;
}

export const FAQCard: React.FC<FAQCardProps> = ({ question, answer }) => {
  return (
    <div className={styles.faqCard}>
      <h3 className={styles.faqQuestion}>{question}</h3>
      <p className={styles.faqAnswer}>{answer}</p>
    </div>
  );
};