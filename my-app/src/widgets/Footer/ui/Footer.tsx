import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Левая колонка - XPoint */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>XPoint</h3>
            <p className={styles.description}>
              Место, где геймеры становятся спортсменами, а спортсмены берут в руки геймпады. Фиджитал-турниры, живые эмоции, настоящие победы.
            </p>
          </div>

          {/* Вторая колонка - Разделы сайта */}
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

          {/* Третья колонка - Информация */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Информация</h3>
            <ul className={styles.linkList}>
              <li><Link to="/faq" className={styles.link}>FAQ (Вопросы и ответы)</Link></li>
              <li><Link to="/privacy" className={styles.link}>Политика конфиденциальности</Link></li>
            </ul>
          </div>

          {/* Четвертая колонка - Информация (контакты) */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Информация</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <span>Организаторы</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <span>г. Екатеринбург, ул. Чкалова, 3</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <span>XP-League@mail.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          © {new Date().getFullYear()} XPoint. Все права защищены.
        </div>
      </div>
    </footer>
  );
};