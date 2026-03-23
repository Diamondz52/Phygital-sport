import React, { useState } from 'react';
import { useAuth } from '../../model';
import styles from './RegisterModal.module.scss';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.full_name) {
      newErrors.full_name = 'Имя обязательно';
    } else if (formData.full_name.length < 2) {
      newErrors.full_name = 'Имя должно содержать минимум 2 символа';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'Необходимо согласие с политикой конфиденциальности';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setAgreeToTerms(checked);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(formData.email, formData.full_name, formData.password);
      onClose();
    } catch (error: any) {
      setErrors({ form: error.message || 'Ошибка регистрации' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2 className={styles.title}>РЕГИСТРАЦИЯ</h2>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введите email"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Имя</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введите имя"
            />
            {errors.full_name && <span className={styles.error}>{errors.full_name}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введите пароль"
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Подтвердите пароль</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              placeholder="Подтвердите пароль"
            />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              Я согласен с условиями политики конфиденциальности
            </label>
          </div>
          {errors.terms && <span className={styles.error}>{errors.terms}</span>}

          {errors.form && <div className={styles.formError}>{errors.form}</div>}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className={styles.switchText}>
          <span>Есть аккаунт? </span>
          <button onClick={onSwitchToLogin} className={styles.switchButton}>
            Войдите
          </button>
        </div>
      </div>
    </>
  );
};