import React, { useState } from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const teams: Team[] = [
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
        { id: 5, name: 'Игрок 5' },
      ]
    },
    { 
      id: 2, 
      name: 'New Dimension', 
      logo: '/src/shared/assets/images/team2.png',
      captain: 'Дмитрий Петров',
      players: [
        { id: 1, name: 'Дмитрий Петров', isCaptain: true },
        { id: 2, name: 'Игрок 2' },
        { id: 3, name: 'Игрок 3' },
        { id: 4, name: 'Игрок 4' },
        { id: 5, name: 'Игрок 5' },
      ]
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(selectedTeam?.id === team.id ? null : team);
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Заголовок */}
          <h1 className={styles.title}>КОМАНДЫ</h1>
          
          {/* Подзаголовок */}
          <p className={styles.subtitle}>
            На этой странице живут команды, которые делают наш проект особенным. Ищи знакомые названия, открывай новые имена и становись частью большого фиджитал-семейства.
          </p>

          {/* Кнопка "Как создать команду?" */}
          <button className={styles.createButton} onClick={handleOpenModal}>
            Как создать команду?
          </button>

          {/* Список команд */}
          <div className={styles.teamsList}>
            {teams.map((team) => (
              <div key={team.id} className={styles.teamWrapper}>
                <div 
                  className={styles.teamCard}
                  onClick={() => handleTeamClick(team)}
                >
                  <div className={styles.teamLogo}>
                    <img src={team.logo} alt={team.name} />
                  </div>
                  <h2 className={styles.teamName}>{team.name}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Состав команды (отображается справа под кнопкой) */}
          {selectedTeam && (
            <div className={styles.teamComposition}>
              <div className={styles.compositionHeader}>
                <h3 className={styles.compositionTitle}>{selectedTeam.name}</h3>
                <div className={styles.compositionAvatar}>
                  <img src={selectedTeam.logo} alt={selectedTeam.name} />
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

      {/* Модальное окно "Как создать команду?" */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.createTeamModal} onClick={(e) => e.stopPropagation()}>
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
              <p>Почта для связи: XP-League@mail.ru</p>
            </div>
            <button className={styles.sendButton} onClick={handleCloseModal}>ОК</button>
          </div>
        </div>
      )}
    </div>
  );
};