import React, { useState } from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import { ApplicationModal } from '../../../features/application';
import styles from './TournamentsPage.module.scss';

export const TournamentsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Заголовок ТУРНИРЫ с обводкой */}
          <h1 className={styles.title}>ТУРНИРЫ</h1>
          
          {/* Подзаголовок */}
          <p className={styles.subtitle}>
            Не знаешь с чего начать? Мы собрали все доступные турниры на одной странице.<br />
            Смотри, какие дисциплины в доступе, изучай правила и формат.
          </p>

          {/* Карточка турнира */}
          <div className={styles.tournamentCard}>
            <h2 className={styles.tournamentTitle}>Фиджитал Баскетбол 2026</h2>
            <p className={styles.tournamentDate}>26-27 мая</p>
            <p className={styles.tournamentDescription}>
              Весна 2026 — время новых форматов. Приглашаем студентов принять участие в турнире<br />
              по фиджитал-баскетболу.
            </p>
            <p className={styles.tournamentStages}>
              Этап 1: Виртуальный матч в NBA 2К.<br />
              Этап 2: Игра 3×3 на реальной площадке.
            </p>
            <p className={styles.tournamentResult}>
              Победитель определяется по сумме двух этапов. Регистрация уже открыта. Стань<br />
              частью истории студенческого фиджитал-движения!
            </p>
            <button className={styles.applyButton} onClick={handleOpenModal}>
              Как подать заявку?
            </button>
          </div>
        </div>
      </main>

      <Footer />
      
      <ApplicationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};