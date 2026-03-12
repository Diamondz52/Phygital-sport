import React from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './ProfilePage.module.scss';

export const ProfilePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Личный кабинет</h1>
          <p className={styles.text}>Страница личного кабинета находится в разработке</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};