import React, { useState } from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './TournamentsPage.module.scss';

export const TournamentsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    phone: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setFormData({ teamName: '', phone: '', additionalInfo: '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки на бэкенд
    setTimeout(() => {
      console.log('Application submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      // Через 2 секунды закрываем модальное окно
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }, 1000);
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>ТУРНИРЫ</h1>
          
          <p className={styles.subtitle}>
            Не знаешь с чего начать? Мы собрали все доступные турниры на одной странице.<br />
            Смотри, какие дисциплины в доступе, изучай правила и формат.
          </p>

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

      {/* Модальное окно заявки */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleCloseModal}>×</button>
            
            {!isSuccess ? (
              <>
                <h3 className={styles.modalTitle}>ЗАЯВКА НА ТУРНИР</h3>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="teamName"
                      placeholder="Название команды*"
                      value={formData.teamName}
                      onChange={handleChange}
                      className={styles.modalInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Номер телефона для связи*"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.modalInput}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <textarea
                      name="additionalInfo"
                      placeholder="Дополнительные сведения"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      className={styles.modalTextarea}
                      rows={4}
                    />
                  </div>
                  <button type="submit" className={styles.modalSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                  </button>
                  <p className={styles.modalNote}>
                    Организатор свяжется с вами для подтверждения
                  </p>
                </form>
              </>
            ) : (
              <div className={styles.modalSuccess}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Заявка отправлена!</h3>
                <p className={styles.successMessage}>
                  Организатор свяжется с вами для подтверждения
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};