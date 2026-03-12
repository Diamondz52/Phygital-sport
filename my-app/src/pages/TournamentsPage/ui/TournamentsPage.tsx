import React from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './TournamentsPage.module.scss';

export const TournamentsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Турниры</h1>
          <p className={styles.text}>Страница с турнирами находится в разработке</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};