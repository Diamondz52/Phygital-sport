import React from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './FAQPage.module.scss';

export const FAQPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>FAQ</h1>
          <p className={styles.text}>Страница с вопросами и ответами находится в разработке</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};