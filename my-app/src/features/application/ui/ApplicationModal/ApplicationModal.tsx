import React, { useState } from 'react';
import styles from './ApplicationModal.module.scss';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    phone: '',
    additionalInfo: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Закрываем окно сразу после отправки
    onClose();
    // Очищаем форму
    setFormData({ teamName: '', phone: '', additionalInfo: '' });
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2 className={styles.title}>ЗАЯВКА НА ТУРНИР</h2>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Название команды*"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="Номер телефона для связи*"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Дополнительные сведения"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Отправить
          </button>
        </form>
        
        <p className={styles.note}>
          Организатор свяжется с вами для подтверждения
        </p>
      </div>
    </>
  );
};