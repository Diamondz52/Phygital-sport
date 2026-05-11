import React, { useState } from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './ContactsPage.module.scss';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

export const ContactsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const subjectOptions = [
    'Техническая проблема',
    'Предложение сотрудничества',
    'Вопрос о турнире',
    'Другое'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите ваш email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Выберите тему сообщения';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Введите сообщение';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setSubmitStatus(null);
    setSubmitMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className={styles.title}>КОНТАКТЫ</h1>
          
          <div className={styles.contactsWrapper}>
            <div className={styles.contactInfoCard}>
              <h2 className={styles.contactTitle}>Мы всегда на связи</h2>
              
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-1.5 0-2.8-.6-3.7-1.6.2-1.1 1.1-2 2.5-2h2.4c1.4 0 2.3.9 2.5 2-.9 1-2.2 1.6-3.7 1.6z" fill="#D38DFF"/>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Режим работы</div>
                    <div className={styles.infoValue}>Пн-Пт 9:00 - 18:00</div>
                    <div className={styles.infoSubValue}>Сб-Вс выходной</div>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M20 15.5C18.75 15.5 17.55 15.3 16.43 14.93C16.08 14.82 15.69 14.9 15.41 15.17L13.21 17.37C10.38 15.93 8.06 13.62 6.62 10.78L8.82 8.57C9.1 8.29 9.18 7.9 9.07 7.55C8.7 6.44 8.5 5.24 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z" fill="#D38DFF"/>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Телефон</div>
                    <div className={styles.infoValue}>8 (495) 123-45-67</div>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#D38DFF"/>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Email</div>
                    <div className={styles.infoValue}>phygitalcore@mail.ru</div>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
  <div className={styles.infoIcon}>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.47L11.75 5.18" stroke="#D38DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 11C13.5705 10.4259 13.0226 9.95089 12.3934 9.60707C11.7643 9.26325 11.0685 9.05885 10.3533 9.00766C9.63816 8.95648 8.92036 9.05968 8.24862 9.31024C7.57688 9.5608 6.96688 9.95299 6.46 10.46L3.46 13.46C2.54918 14.403 2.0452 15.6661 2.0566 16.977C2.06799 18.288 2.59383 19.5421 3.52087 20.4691C4.44791 21.3962 5.70198 21.922 7.01296 21.9334C8.32394 21.9448 9.58695 21.4408 10.53 20.53L12.24 18.82" stroke="#D38DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
  <div className={styles.infoContent}>
    <div className={styles.infoLabel}>Организаторы</div>
    <a 
      href="https://it-college.ru/" 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.infoLink}
    >
      it-college.ru
    </a>
  </div>
</div>
              </div>
              
              <button className={styles.writeButton} onClick={handleOpenModal}>
                Задать вопрос
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={handleCloseModal}>×</button>
            <h3 className={styles.modalTitle}>Задать вопрос</h3>
            
            {submitStatus && (
              <div className={`${styles.submitMessage} ${styles[submitStatus]}`}>
                {submitMessage}
              </div>
            )}
            
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя *"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.modalInput} ${errors.name ? styles.error : ''}`}
                />
                {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.modalInput} ${errors.email ? styles.error : ''}`}
                />
                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${styles.modalSelect} ${errors.subject ? styles.error : ''}`}
                >
                  <option value="">Выберите тему *</option>
                  {subjectOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.subject && <span className={styles.errorMessage}>{errors.subject}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Ваш вопрос *"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.modalTextarea} ${errors.message ? styles.error : ''}`}
                  rows={6}
                />
                {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className={styles.modalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};