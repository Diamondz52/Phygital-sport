import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthPopup.module.scss';

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2 className={styles.title}>ВХОД</h2>
        
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input 
              type="email" 
              className={styles.input}
              placeholder="Введите email"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <input 
              type="password" 
              className={styles.input}
              placeholder="Введите пароль"
            />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>
        
        <div className={styles.registerLink}>
          <span>Ещё нет аккаунта? </span>
          <Link to="/register" className={styles.registerButton} onClick={onClose}>
            Зарегистрируйтесь
          </Link>
        </div>
      </div>
    </>
  );
};