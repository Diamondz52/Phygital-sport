import React, { useState, useEffect } from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import { useAuth } from '../../../features/auth/model';
import styles from './TeamsPage.module.scss';

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

export const TeamsPage: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  // Заглушка для логотипа по умолчанию
  const defaultLogo = '/src/shared/assets/images/default-team-logo.png';

  useEffect(() => {
    // Загрузка команд пользователя (заглушка - в будущем заменится на API)
    const loadUserTeams = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // TODO: Здесь будет запрос к бэкенду:
        // const response = await api.get(`/users/${user?.id}/teams`);
        // setUserTeams(response.data);
        
        // Заглушка для демонстрации
        const allTeams: Team[] = [
          { 
            id: 1, 
            name: 'New Dimension', 
            logo: '/src/shared/assets/images/team1.jpg',
            captain: 'Алексей Иванов',
            players: [
              { id: 1, name: 'Алексей Иванов', isCaptain: true },
              { id: 2, name: 'Дмитрий Соколов' },
              { id: 3, name: 'Игрок 3' },
              { id: 4, name: 'Игрок 4' },
              { id: 5, name: 'Игрок 5' },
            ]
          },
          { 
            id: 2, 
            name: 'Cyber Warriors', 
            logo: '/src/shared/assets/images/team1.jpg',
            captain: 'Екатерина Морозова',
            players: [
              { id: 1, name: 'Екатерина Морозова', isCaptain: true },
              { id: 2, name: 'Игрок 2' },
              { id: 3, name: 'Игрок 3' },
              { id: 4, name: 'Игрок 4' },
              { id: 5, name: 'Игрок 5' },
            ]
          },
        ];
        
        // Фильтруем команды, где состоит пользователь (по email капитана или имени)
        // В реальном проекте бэкенд вернет только команды пользователя
        const userEmail = user?.email;
        const filteredTeams = allTeams.filter(team => {
          // Заглушка: показываем все команды для демонстрации
          // В реальном проекте проверка будет по ID пользователя
          return true;
        });
        
        setUserTeams(filteredTeams);
      } catch (error) {
        console.error('Error loading teams:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserTeams();
  }, [user]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(selectedTeam?.id === team.id ? null : team);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.gradientBg}>
          <div className={styles.ellipse4}></div>
          <div className={styles.ellipse2}></div>
          <div className={styles.ellipse5}></div>
          <div className={styles.ellipse6}></div>
        </div>
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
      <div className={styles.gradientBg}>
        <div className={styles.ellipse4}></div>
        <div className={styles.ellipse2}></div>
        <div className={styles.ellipse5}></div>
        <div className={styles.ellipse6}></div>
      </div>
      
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>КОМАНДЫ</h1>
          
          <p className={styles.subtitle}>
            На этой странице живут команды, которые делают наш проект особенным. Ищи знакомые названия, открывай новые имена и становись частью большого фиджитал-семейства.
          </p>

          <button className={styles.createButton} onClick={handleOpenModal}>
            Как создать команду?
          </button>

          {userTeams.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Вы пока не состоите ни в одной команде</p>
              <p className={styles.emptyStateHint}>Свяжитесь с организатором для создания или вступления в команду</p>
            </div>
          ) : (
            <div className={styles.teamsList}>
              {userTeams.map((team) => (
                <div key={team.id} className={styles.teamWrapper}>
                  <div 
                    className={styles.teamCard}
                    onClick={() => handleTeamClick(team)}
                  >
                    <div className={styles.teamLogo}>
                      <img 
                        src={team.logo} 
                        alt={team.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultLogo;
                        }}
                      />
                    </div>
                    <h2 className={styles.teamName}>{team.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTeam && (
            <div className={styles.teamComposition}>
              <div className={styles.compositionHeader}>
                <h3 className={styles.compositionTitle}>{selectedTeam.name}</h3>
                <div className={styles.compositionAvatar}>
                  <img 
                    src={selectedTeam.logo} 
                    alt={selectedTeam.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultLogo;
                    }}
                  />
                </div>
              </div>
              
              <div className={styles.playersList}>
                {selectedTeam.players.map((player) => (
                  <div key={player.id} className={styles.playerCard}>
                    <span className={styles.playerName}>{player.name}</span>
                    {player.isCaptain && <span className={styles.captainBadge}>капитан</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.createTeamModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
            <h2 className={styles.createTeamTitle}>Создание команды</h2>
            <div className={styles.createTeamText}>
              <p>Свяжитесь с организатором для подачи заявки на создание команды и укажите:</p>
              <div className={styles.checklist}>
                <p>✓ Название команды</p>
                <p>✓ Состав (ФИО)</p>
                <p>✓ Капитана</p>
                <p>✓ Дисциплину</p>
              </div>
              <p>Все участники должны быть зарегистрированы на сайте.</p>
              <p>Почта для связи: phygitalcore@mail.ru</p>
            </div>
            <button className={styles.sendButton} onClick={handleCloseModal}>ОК</button>
          </div>
        </div>
      )}
    </div>
  );
};