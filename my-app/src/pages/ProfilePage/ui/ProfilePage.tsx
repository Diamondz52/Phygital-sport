import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

interface Player {
  id: number;
  name: string;
  isCaptain?: boolean;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  captain: string;
  players: Player[];
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
  const [loginError, setLoginError] = useState<string | null>(null);

  const isAdmin = user?.email === 'pyankovad2606@gmail.com' || user?.role === 'admin';

  // Простое форматирование номера телефона
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 0) return '';
    if (digits.length === 1 && (digits[0] !== '7' && digits[0] !== '8')) {
      return `+7 ${digits}`;
    }
    
    const limitedDigits = digits.slice(0, 11);
    let normalized = limitedDigits;
    if (normalized[0] === '8') {
      normalized = '7' + normalized.slice(1);
    }
    
    if (normalized.length === 1) return `+7`;
    if (normalized.length <= 4) return `+7 ${normalized.slice(1)}`;
    if (normalized.length <= 7) return `+7 ${normalized.slice(1, 4)} ${normalized.slice(4)}`;
    if (normalized.length <= 9) return `+7 ${normalized.slice(1, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7)}`;
    return `+7 ${normalized.slice(1, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7, 9)} ${normalized.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (rawValue.length < formData.phone.length) {
      setFormData(prev => ({ ...prev, phone: rawValue }));
    } else {
      const formatted = formatPhoneNumber(rawValue);
      setFormData(prev => ({ ...prev, phone: formatted }));
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setLoginError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Проверка на существование пользователя
        //if (!user?.email) {
          //setLoginError('Пользователь не найден');
          //setLoading(false);
          //return;
       // }
        
        setFormData({
          email: user?.email || '',
          full_name: user?.full_name || 'Игрок',
          phone: '+7 922 422 75 54',
          birth_date: '01.01.2001',
          telegram: '@player'
        });
        
        setUserTeams([
          {
            id: 1,
            name: 'New Dimension',
            logo: '/src/shared/assets/images/team1.png',
            captain: 'Алексей Иванов',
            players: [
              { id: 1, name: 'Алексей Иванов', isCaptain: true },
              { id: 2, name: 'Игрок 2' },
              { id: 3, name: 'Игрок 3' },
              { id: 4, name: 'Игрок 4' },
              { id: 5, name: 'Игрок 5' }
            ]
          }
        ]);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoginError('Ошибка загрузки данных пользователя');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      handlePhoneChange(e);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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

  if (loginError) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.loadingContainer}>
          <p className={styles.errorMessage}>{loginError}</p>
          <button onClick={() => navigate('/')} className={styles.editButton}>
            Вернуться на главную
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Градиентный фон */}
      <div className={styles.gradientBg}>
        <div className={styles.ellipse4}></div>
        <div className={styles.ellipse2}></div>
        <div className={styles.ellipse5}></div>
        <div className={styles.ellipse6}></div>
      </div>
      
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>ЛИЧНЫЙ КАБИНЕТ</h1>
          
          <div className={styles.profileCard}>
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
                      placeholder="+7 XXX XXX XX XX"
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
                          <span className={styles.captainBadge}>капитан</span>
                        </div>
                        <div className={`${styles.expandIcon} ${expandedTeamId === team.id ? styles.expanded : ''}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      {expandedTeamId === team.id && (
                        <div className={styles.teamMembers}>
                          <p className={styles.membersTitle}>Состав команды:</p>
                          <ul>
                            {team.players.map((player) => (
                              <li key={player.id}>
                                {player.name}
                                {player.isCaptain && <span className={styles.memberRole}>капитан</span>}
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
          
          <div className={styles.buttonsWrapper}>
            {isAdmin && (
              <Link to="/admin">
                <button className={styles.adminButton}>
                  Админ-панель
                </button>
              </Link>
            )}
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