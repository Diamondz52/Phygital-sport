import React from 'react';
import { Header } from '../../../widgets/Header/ui/Header'; // Прямой импорт
import styles from './ContactsPage.module.scss';

export const ContactsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Контакты</h1>
          <p>Страница в разработке</p>
        </div>
      </main>
    </div>
  );
};