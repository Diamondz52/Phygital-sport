import React from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './MediaPage.module.scss';

export const MediaPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Медиацентр</h1>
          <p className={styles.text}>Страница медиацентра находится в разработке</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};