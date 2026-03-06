import React from 'react';
import { Header } from '../../../widgets/Header/ui/Header'; // Прямой импорт
import styles from './TeamsPage.module.scss';

export const TeamsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Команды</h1>
          <p>Страница в разработке</p>
        </div>
      </main>
    </div>
  );
};