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
      newErrors.subject = 'Введите тему сообщения';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Введите сообщение';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    <div className={styles.infoValue}>Пн-Пт 10:00 - 18:00</div>
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
                    <div className={styles.infoValue}>XPoint@mail.ru</div>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2Z" fill="#D38DFF"/>
                      <path d="M12 6.5C10.62 6.5 9.5 7.62 9.5 9C9.5 10.38 10.62 11.5 12 11.5C13.38 11.5 14.5 10.38 14.5 9C14.5 7.62 13.38 6.5 12 6.5Z" fill="#190027"/>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Адрес</div>
                    <div className={styles.infoValue}>г. Екатеринбург, ул. Чкалова, 3</div>
                  </div>
                </div>
              </div>
              
              <button className={styles.writeButton} onClick={handleOpenModal}>
                Написать нам
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
            <h3 className={styles.modalTitle}>Написать нам</h3>
            
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
                <input
                  type="text"
                  name="subject"
                  placeholder="Тема сообщения *"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${styles.modalInput} ${errors.subject ? styles.error : ''}`}
                />
                {errors.subject && <span className={styles.errorMessage}>{errors.subject}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Сообщение *"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.modalTextarea} ${errors.message ? styles.error : ''}`}
                  rows={8}
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