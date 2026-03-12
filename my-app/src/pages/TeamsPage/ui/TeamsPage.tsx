import React from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './TeamsPage.module.scss';

export const TeamsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Команды</h1>
          <p className={styles.text}>Страница с командами находится в разработке</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};