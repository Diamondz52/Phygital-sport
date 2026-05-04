import React from 'react';
import organizersIcon from '../../../shared/assets/icons/organizers.svg';
import styles from './Footer.module.scss';

const ScrollToTopLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    window.location.href = to;
  };

  return (
    <a href={to} onClick={handleClick} className={styles.link}>
      {children}
    </a>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Колонка 1 - XPoint */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>XPoint</h3>
            <p className={styles.description}>
              Место, где геймеры<br />
              становятся спортсменами,<br />
              а спортсмены берут в руки<br />
              геймпады. Фиджитал-турниры,<br />
              живые эмоции, настоящие<br />
              победы.
            </p>
          </div>

          {/* Колонка 2 - Разделы сайта */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Разделы сайта</h3>
            <ul className={styles.linkList}>
              <li><ScrollToTopLink to="/">Главная</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/tournaments">Турниры</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/disciplines">Дисциплины</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/teams">Команды</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/media">Медиацентр</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/faq">FAQ</ScrollToTopLink></li>
            </ul>
          </div>

          {/* Колонка 3 - Информация */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Информация</h3>
            <ul className={styles.linkList}>
              <li><ScrollToTopLink to="/faq">FAQ (Вопросы и ответы)</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/privacy">Политика конфиденциальности</ScrollToTopLink></li>
            </ul>
          </div>

          {/* Колонка 4 - Контакты */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Контакты</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <img 
                    src={organizersIcon} 
                    alt="Организаторы" 
                    width="32" 
                    height="32" 
                  />
                </span>
                <span>Организаторы</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span>г. Екатеринбург, ул. Чкалова, 3</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
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