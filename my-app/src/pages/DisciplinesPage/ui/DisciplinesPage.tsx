import React from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './DisciplinesPage.module.scss';

export const DisciplinesPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>Дисциплины</h1>
          <p className={styles.text}>Страница с дисциплинами находится в разработке</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};