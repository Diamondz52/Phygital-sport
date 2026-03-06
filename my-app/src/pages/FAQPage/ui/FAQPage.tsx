import React from 'react';
import { Header } from '../../../widgets/Header';
import styles from './FAQPage.module.scss';

export const FAQPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>FAQ</h1>
          <p>Страница с вопросами и ответами</p>
        </div>
      </main>
    </div>
  );
};