import React, { useState } from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './TournamentsPage.module.scss';

interface FormData {
  teamName: string;
  phone: string;
  additionalInfo: string;
}

export const TournamentsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    phone: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Форматирование номера телефона
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 0) return '';
    if (digits.length === 1 && (digits[0] !== '7' && digits[0] !== '8')) {
      return `+7 ${digits}`;
    }
    
    const limitedDigits = digits.slice(0, 11);
    
    let normalized = limitedDigits;
    if (normalized[0] === '8') {
      normalized = '7' + normalized.slice(1);
    }
    
    if (normalized.length === 1) return `+7`;
    if (normalized.length <= 4) return `+7 ${normalized.slice(1)}`;
    if (normalized.length <= 7) return `+7 ${normalized.slice(1, 4)} ${normalized.slice(4)}`;
    if (normalized.length <= 9) return `+7 ${normalized.slice(1, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7)}`;
    return `+7 ${normalized.slice(1, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7, 9)} ${normalized.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (rawValue.length < formData.phone.length) {
      setFormData(prev => ({ ...prev, phone: rawValue }));
    } else {
      const formatted = formatPhoneNumber(rawValue);
      setFormData(prev => ({ ...prev, phone: formatted }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      handlePhoneChange(e as React.ChangeEvent<HTMLInputElement>);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setFormData({ teamName: '', phone: '', additionalInfo: '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Application submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }, 1000);
  };

  return (
    <div className={styles.page}>
      {/* Градиентный фон */}
      <div className={styles.gradientBg}>
        <div className={styles.ellipse4}></div>
        <div className={styles.ellipse2}></div>
        <div className={styles.ellipse5}></div>
        <div className={styles.ellipse6}></div>
      </div>
      
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
              Подать заявку
            </button>
          </div>
        </div>
      </main>

      <Footer />

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
                      placeholder="+7 XXX XXX XX XX"
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
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
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