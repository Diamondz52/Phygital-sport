import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthPopup } from '../../../features/auth/ui/AuthPopup';
import styles from './Header.module.scss';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Главная', path: '/' },
  { label: 'Турниры', path: '/tournaments' },
  { label: 'Дисциплины', path: '/disciplines' },
  { label: 'Команды', path: '/teams' },
  { label: 'Медиацентр', path: '/media' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Контакты', path: '/contacts' },
];

export const Header: React.FC = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('Главная');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showContacts, setShowContacts] = useState(true);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navItems.find(item => item.path === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.label);
    }
  }, [location]);

  const handleProfileClick = () => {
    setIsPopupOpen(true);
    setShowContacts(false); // Контакты исчезают при открытии попапа
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setShowContacts(true); // Контакты появляются при закрытии
  };

  // Фильтруем элементы навигации
  const visibleNavItems = showContacts 
    ? navItems 
    : navItems.filter(item => item.label !== 'Контакты');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navWrapper}>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                {visibleNavItems.map((item) => (
                  <li key={item.label} className={styles.navItem}>
                    <Link
                      to={item.path}
                      className={`${styles.navLink} ${
                        activeItem === item.label ? styles.active : ''
                      }`}
                      onClick={() => setActiveItem(item.label)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Кнопка с человечком */}
                <li className={styles.navItem}>
                  <button 
                    className={styles.profileButton}
                    onClick={handleProfileClick}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Попап авторизации */}
      <AuthPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  );
};