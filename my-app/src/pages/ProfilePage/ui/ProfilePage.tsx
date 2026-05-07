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
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
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

  // Состояния для смены пароля
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // Состояния для показа/скрытия пароля
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.email === 'pyankovad2606@gmail.com';

  // Форматирование номера телефона
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

  // Форматирование даты
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return '';
    if (dateString.includes('.')) return dateString;
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return dateString;
  };

  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return '';
    if (dateString.includes('-')) return dateString;
    const parts = dateString.split('.');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      let year = parts[2];
      if (year.length > 4) {
        year = year.slice(0, 4);
      }
      return `${year}-${month}-${day}`;
    }
    return dateString;
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const yearPart = dateValue.split('-')[0];
      if (yearPart && yearPart.length > 4) {
        return;
      }
      const formattedDate = formatDateForDisplay(dateValue);
      setFormData(prev => ({ ...prev, birth_date: formattedDate }));
    } else {
      setFormData(prev => ({ ...prev, birth_date: '' }));
    }
  };

  // Обработчики для смены пароля
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (passwordMessage) {
      setPasswordMessage('');
    }
  };

  const validatePasswordForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Введите текущий пароль';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'Введите новый пароль';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Пароль должен содержать минимум 6 символов';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Подтвердите новый пароль';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setIsChangingPassword(true);
    setPasswordMessage('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const storedUsers = localStorage.getItem('registered_users');
      if (storedUsers && user) {
        const users = JSON.parse(storedUsers);
        const currentUser = users[user.email];
        
        if (!currentUser || currentUser.password !== passwordData.currentPassword) {
          setPasswordErrors({ currentPassword: 'Неверный текущий пароль' });
          setIsChangingPassword(false);
          return;
        }
        
        users[user.email] = {
          ...currentUser,
          password: passwordData.newPassword
        };
        localStorage.setItem('registered_users', JSON.stringify(users));
      }
      
      setPasswordMessage('Пароль успешно изменен!');
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordErrors({});
      
      setTimeout(() => {
        setShowPasswordForm(false);
        setPasswordMessage('');
      }, 2000);
      
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordMessage('Ошибка при смене пароля');
    } finally {
      setIsChangingPassword(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setLoginError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const savedProfileData = localStorage.getItem('user_profile_data');
        let savedData = null;
        if (savedProfileData) {
          savedData = JSON.parse(savedProfileData);
        }
        
        let birthDate = savedData?.birth_date || '01.01.2001';
        
        setFormData({
          email: user?.email || '',
          full_name: user?.full_name || savedData?.full_name || 'Игрок',
          phone: savedData?.phone || '+7 922 422 75 54',
          birth_date: formatDateForDisplay(birthDate),
          telegram: savedData?.telegram || '@player'
        });
        
        setUserTeams([
          {
            id: 1,
            name: 'New Dimension',
            logo: '/src/shared/assets/images/team1.png',
            captain: 'Алексей Иванов',
            players: [
              { id: 1, name: 'Алексей Иванов', isCaptain: true },
              { id: 2, name: 'Дмитрий Соколов' },
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
    } else if (name === 'birth_date') {
      handleDateChange(e);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Saved user data:', formData);
      
      const profileDataToSave = {
        full_name: formData.full_name,
        phone: formData.phone,
        birth_date: formData.birth_date,
        telegram: formData.telegram,
        email: formData.email
      };
      localStorage.setItem('user_profile_data', JSON.stringify(profileDataToSave));
      
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
          
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Профиль
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'security' ? styles.active : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Безопасность
            </button>
          </div>
          
          {activeTab === 'profile' && (
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
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.editInput}
                        placeholder="example@mail.ru"
                      />
                    ) : (
                      <p>{formData.email || 'Не указан'}</p>
                    )}
                  </div>
                  
                  <div className={styles.infoGroup}>
                    <label>Дата рождения</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="birth_date"
                        value={formatDateForInput(formData.birth_date)}
                        onChange={handleInputChange}
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
          )}
          
          {activeTab === 'security' && (
            <div className={styles.securityCard}>
              <h3 className={styles.securityTitle}>Смена пароля</h3>
              <p className={styles.securityDescription}>
                Для безопасности аккаунта рекомендуется периодически менять пароль.
              </p>
              
              {!showPasswordForm ? (
                <button 
                  className={styles.changePasswordButton}
                  onClick={() => setShowPasswordForm(true)}
                >
                  Изменить пароль
                </button>
              ) : (
                <form className={styles.passwordForm} onSubmit={handleChangePassword}>
                  <div className={styles.infoGroup}>
                    <label>Текущий пароль</label>
                    <div className={styles.passwordInputWrapper}>
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className={styles.editInput}
                        placeholder="Введите текущий пароль"
                      />
                      <button
                        type="button"
                        className={styles.togglePasswordButton}
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <span className={styles.errorText}>{passwordErrors.currentPassword}</span>
                    )}
                  </div>
                  
                  <div className={styles.infoGroup}>
                    <label>Новый пароль</label>
                    <div className={styles.passwordInputWrapper}>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={styles.editInput}
                        placeholder="Введите новый пароль (мин. 6 символов)"
                      />
                      <button
                        type="button"
                        className={styles.togglePasswordButton}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <span className={styles.errorText}>{passwordErrors.newPassword}</span>
                    )}
                  </div>
                  
                  <div className={styles.infoGroup}>
                    <label>Подтверждение пароля</label>
                    <div className={styles.passwordInputWrapper}>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={styles.editInput}
                        placeholder="Подтвердите новый пароль"
                      />
                      <button
                        type="button"
                        className={styles.togglePasswordButton}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <span className={styles.errorText}>{passwordErrors.confirmPassword}</span>
                    )}
                  </div>
                  
                  {passwordMessage && (
                    <div className={`${styles.saveMessage} ${passwordMessage.includes('успешно') ? styles.successMessage : styles.errorMessage}`}>
                      {passwordMessage}
                    </div>
                  )}
                  
                  <div className={styles.buttonGroup}>
                    <button 
                      type="submit" 
                      className={styles.saveButton}
                      disabled={isChangingPassword}
                    >
                      {isChangingPassword ? 'Сохранение...' : 'Сохранить пароль'}
                    </button>
                    <button 
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                        setPasswordErrors({});
                        setPasswordMessage('');
                        setShowCurrentPassword(false);
                        setShowNewPassword(false);
                        setShowConfirmPassword(false);
                      }}
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          
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