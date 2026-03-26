import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Колонка 1 - XPoint */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>XPoint</h3>
            <p className={styles.description}>
              Место, где геймеры становятся спортсменами,<br />
              а спортсмены берут в руки геймпады.<br />
              Фиджитал-турниры, живые эмоции,<br />
              настоящие победы.
            </p>
          </div>

          {/* Колонка 2 - Разделы сайта */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Разделы сайта</h3>
            <ul className={styles.linkList}>
              <li><Link to="/" className={styles.link}>Главная</Link></li>
              <li><Link to="/tournaments" className={styles.link}>Турниры</Link></li>
              <li><Link to="/disciplines" className={styles.link}>Дисциплины</Link></li>
              <li><Link to="/teams" className={styles.link}>Команды</Link></li>
              <li><Link to="/media" className={styles.link}>Медиацентр</Link></li>
              <li><Link to="/faq" className={styles.link}>FAQ</Link></li>
            </ul>
          </div>

          {/* Колонка 3 - Информация */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Информация</h3>
            <ul className={styles.linkList}>
              <li><Link to="/faq" className={styles.link}>FAQ (Вопросы и ответы)</Link></li>
              <li><Link to="/privacy" className={styles.link}>Политика конфиденциальности</Link></li>
            </ul>
          </div>

          {/* Колонка 4 - Контакты */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Информация</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                  </svg>
                </span>
                <span>Организаторы</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                  </svg>
                </span>
                <span>г. Екатеринбург, ул. Чкалова, 3</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 15.5C18.75 15.5 17.55 15.3 16.43 14.93C16.08 14.82 15.69 14.9 15.41 15.17L13.21 17.37C10.38 15.93 8.06 13.62 6.62 10.78L8.82 8.57C9.1 8.29 9.18 7.9 9.07 7.55C8.7 6.44 8.5 5.24 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z" fill="currentColor"/>
                  </svg>
                </span>
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                  </svg>
                </span>
                <span>XP-League@mail.ru</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};