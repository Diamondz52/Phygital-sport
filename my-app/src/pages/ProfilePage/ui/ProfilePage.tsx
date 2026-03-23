import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import { useAuth } from '../../../features/auth/model';
import styles from './ProfilePage.module.scss';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Личный кабинет</h1>
          
          {user && (
            <div className={styles.userInfo}>
              <p className={styles.userName}>Имя: {user.full_name}</p>
              <p className={styles.userEmail}>Email: {user.email}</p>
            </div>
          )}
          
          <button onClick={handleLogout} className={styles.logoutButton}>
            Выйти из аккаунта
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};