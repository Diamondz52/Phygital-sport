import React from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './ContactsPage.module.scss';

export const ContactsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Контакты</h1>
          <p className={styles.text}>Страница с контактами находится в разработке</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};