import React from 'react';
import { Header } from '../../../widgets/Header';
import styles from './DisciplinesPage.module.scss';

export const DisciplinesPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Дисциплины</h1>
          <p>Страница с дисциплинами</p>
        </div>
      </main>
    </div>
  );
};