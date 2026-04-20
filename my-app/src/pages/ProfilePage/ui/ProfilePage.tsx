import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import { useAuth } from '../../../features/auth/model';
import styles from './ProfilePage.module.scss';

interface UserData {
  email: string;
  full_name: string;
  phone: string;
  birth_date: string;
  telegram: string;
}

interface Team {
  id: number;
  name: string;
  isCaptain: boolean;
  members: { id: number; name: string; role?: string }[];
}

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    email: '',
    full_name: '',
    phone: '',
    birth_date: '',
    telegram: ''
  });
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);

  // Заглушка для получения данных пользователя
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setFormData({
          email: user?.email || 'player1@mail.ru',
          full_name: user?.full_name || 'Игрок 1',
          phone: '+7 922 422 75-54',
          birth_date: '01.01.2001',
          telegram: '@player1'
        });
        
        setUserTeams([
          {
            id: 1,
            name: 'Команда 1',
            isCaptain: true,
            members: [
              { id: 1, name: 'Алексей Иванов', role: 'Капитан' },
              { id: 2, name: 'Игрок 2' },
              { id: 3, name: 'Игрок 3' },
              { id: 4, name: 'Игрок 4' },
              { id: 5, name: 'Игрок 5' }
            ]
          },
          {
            id: 2,
            name: 'Команда 2',
            isCaptain: false,
            members: [
              { id: 1, name: 'Дмитрий Петров', role: 'Капитан' },
              { id: 2, name: 'Игрок 2' },
              { id: 3, name: 'Игрок 3' },
              { id: 4, name: 'Игрок 4' }
            ]
          }
        ]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Saved user data:', formData);
      setSaveMessage('Данные успешно сохранены!');
      setIsEditing(false);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving user data:', error);
      setSaveMessage('Ошибка при сохранении');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleTeamExpand = (teamId: number) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Загрузка...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>ЛИЧНЫЙ КАБИНЕТ</h1>
          
          <div className={styles.profileCard}>
            {/* Левая колонка - основная информация */}
            <div className={styles.leftColumn}>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>{formData.full_name || 'Игрок'}</h2>
                <p className={styles.userEmail}>{formData.email}</p>
              </div>
              
              <div className={styles.infoSection}>
                <div className={styles.infoGroup}>
                  <label>Номер телефона</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.editInput}
                      placeholder="+7 (___) ___-__-__"
                    />
                  ) : (
                    <p>{formData.phone || 'Не указан'}</p>
                  )}
                </div>
                
                <div className={styles.infoGroup}>
                  <label>E-mail</label>
                  <p>{formData.email}</p>
                </div>
                
                <div className={styles.infoGroup}>
                  <label>Дата рождения</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="birth_date"
                      value={formData.birth_date.split('.').reverse().join('-')}
                      onChange={(e) => {
                        const date = e.target.value;
                        if (date) {
                          const [year, month, day] = date.split('-');
                          setFormData(prev => ({ ...prev, birth_date: `${day}.${month}.${year}` }));
                        }
                      }}
                      className={styles.editInput}
                    />
                  ) : (
                    <p>{formData.birth_date || 'Не указана'}</p>
                  )}
                </div>
                
                <div className={styles.infoGroup}>
                  <label>Telegram</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleInputChange}
                      className={styles.editInput}
                      placeholder="@username"
                    />
                  ) : (
                    <p>{formData.telegram || 'Не указан'}</p>
                  )}
                </div>
                
                {saveMessage && <div className={styles.saveMessage}>{saveMessage}</div>}
                
                <div className={styles.buttonGroup}>
                  {isEditing ? (
                    <>
                      <button className={styles.saveButton} onClick={handleSave} disabled={loading}>
                        {loading ? 'Сохранение...' : 'Сохранить'}
                      </button>
                      <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>
                        Отмена
                      </button>
                    </>
                  ) : (
                    <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                      Редактировать
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Правая колонка - мои команды */}
            <div className={styles.rightColumn}>
              <h3 className={styles.teamsTitle}>Мои команды</h3>
              {userTeams.length > 0 ? (
                <div className={styles.teamsList}>
                  {userTeams.map((team) => (
                    <div key={team.id} className={styles.teamItem}>
                      <div 
                        className={styles.teamHeader}
                        onClick={() => toggleTeamExpand(team.id)}
                      >
                        <div className={styles.teamHeaderLeft}>
                          <h4 className={styles.teamName}>{team.name}</h4>
                          {team.isCaptain && <span className={styles.captainBadge}>капитан</span>}
                        </div>
                        <div className={`${styles.expandIcon} ${expandedTeamId === team.id ? styles.expanded : ''}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      {expandedTeamId === team.id && (
                        <div className={styles.teamMembers}>
                          <p className={styles.membersTitle}>Состав команды:</p>
                          <ul>
                            {team.members.map((member) => (
                              <li key={member.id}>
                                {member.name}
                                {member.role && <span className={styles.memberRole}>{member.role}</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noTeams}>Вы пока не состоите ни в одной команде</p>
              )}
            </div>
          </div>
          
          {/* Кнопка выхода */}
          <div className={styles.logoutWrapper}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};