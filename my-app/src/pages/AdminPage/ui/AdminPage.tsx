import React, { useState, useEffect } from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './AdminPage.module.scss';

interface Team {
  id: number;
  name: string;
  logo: string;
  captain: string;
  players: { id: number; name: string }[];
}

interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface Tournament {
  id: number;
  name: string;
  date: string;
  discipline: string;
  status: 'active' | 'completed' | 'upcoming';
}

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'users' | 'tournaments'>('teams');
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    captain: '',
    email: '',
    full_name: '',
    password: '',
    role: 'user',
    tournamentName: '',
    tournamentDate: '',
    tournamentDiscipline: '',
    tournamentStatus: 'upcoming'
  });

  // Заглушка для загрузки данных
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTeams([
        { id: 1, name: 'New Dimension', logo: '/src/shared/assets/images/team1.png', captain: 'Алексей Иванов', players: [{ id: 1, name: 'Игрок 1' }, { id: 2, name: 'Игрок 2' }] },
        { id: 2, name: 'Cyber Warriors', logo: '/src/shared/assets/images/team2.png', captain: 'Екатерина Морозова', players: [{ id: 1, name: 'Игрок 1' }] },
      ]);
      
      setUsers([
        { id: 1, email: 'admin@xpoint.ru', full_name: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
        { id: 2, email: 'user@example.com', full_name: 'Test User', role: 'user', createdAt: '2024-01-15' },
      ]);
      
      setTournaments([
        { id: 1, name: 'Фиджитал Баскетбол 2026', date: '26-27 мая', discipline: 'Баскетбол', status: 'upcoming' },
        { id: 2, name: 'Киберфутбол 2026', date: '10-11 июня', discipline: 'Футбол', status: 'active' },
      ]);
      
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '', logo: '', captain: '', email: '', full_name: '', password: '', role: 'user',
      tournamentName: '', tournamentDate: '', tournamentDiscipline: '', tournamentStatus: 'upcoming'
    });
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'teams') {
      setFormData({ ...formData, name: item.name, logo: item.logo, captain: item.captain });
    } else if (activeTab === 'users') {
      setFormData({ ...formData, email: item.email, full_name: item.full_name, role: item.role });
    } else if (activeTab === 'tournaments') {
      setFormData({ ...formData, tournamentName: item.name, tournamentDate: item.date, tournamentDiscipline: item.discipline, tournamentStatus: item.status });
    }
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      if (activeTab === 'teams') {
        setTeams(prev => prev.filter(t => t.id !== id));
      } else if (activeTab === 'users') {
        setUsers(prev => prev.filter(u => u.id !== id));
      } else if (activeTab === 'tournaments') {
        setTournaments(prev => prev.filter(t => t.id !== id));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'teams') {
      if (editingItem) {
        setTeams(prev => prev.map(t => t.id === editingItem.id ? { ...t, name: formData.name, logo: formData.logo, captain: formData.captain } : t));
      } else {
        setTeams(prev => [...prev, { id: Date.now(), name: formData.name, logo: formData.logo, captain: formData.captain, players: [] }]);
      }
    } else if (activeTab === 'users') {
      if (editingItem) {
        setUsers(prev => prev.map(u => u.id === editingItem.id ? { ...u, email: formData.email, full_name: formData.full_name, role: formData.role as 'user' | 'admin' } : u));
      } else {
        setUsers(prev => [...prev, { id: Date.now(), email: formData.email, full_name: formData.full_name, role: formData.role as 'user' | 'admin', createdAt: new Date().toISOString().split('T')[0] }]);
      }
    } else if (activeTab === 'tournaments') {
      if (editingItem) {
        setTournaments(prev => prev.map(t => t.id === editingItem.id ? { ...t, name: formData.tournamentName, date: formData.tournamentDate, discipline: formData.tournamentDiscipline, status: formData.tournamentStatus as any } : t));
      } else {
        setTournaments(prev => [...prev, { id: Date.now(), name: formData.tournamentName, date: formData.tournamentDate, discipline: formData.tournamentDiscipline, status: formData.tournamentStatus as any }]);
      }
    }
    
    setShowModal(false);
    setEditingItem(null);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Загрузка...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div className={styles.page}>
        <h1 className={styles.title}>АДМИН-ПАНЕЛЬ</h1>
        
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'teams' ? styles.active : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            Команды
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Пользователи
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'tournaments' ? styles.active : ''}`}
            onClick={() => setActiveTab('tournaments')}
          >
            Турниры
          </button>
        </div>
        
        <div className={styles.tableHeader}>
          <h2 className={styles.sectionTitle}>
            {activeTab === 'teams' && 'Управление командами'}
            {activeTab === 'users' && 'Управление пользователями'}
            {activeTab === 'tournaments' && 'Управление турнирами'}
          </h2>
          <button className={styles.addButton} onClick={handleAdd}>
            + Добавить
          </button>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {activeTab === 'teams' && (
                  <>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Логотип</th>
                    <th>Капитан</th>
                    <th>Действия</th>
                  </>
                )}
                {activeTab === 'users' && (
                  <>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Имя</th>
                    <th>Роль</th>
                    <th>Дата регистрации</th>
                    <th>Действия</th>
                  </>
                )}
                {activeTab === 'tournaments' && (
                  <>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Дата</th>
                    <th>Дисциплина</th>
                    <th>Статус</th>
                    <th>Действия</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === 'teams' && teams.map(team => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td><img src={team.logo} alt={team.name} className={styles.tableLogo} /></td>
                  <td>{team.captain}</td>
                  <td>
                    <button className={styles.editBtn} onClick={() => handleEdit(team)}>✏️</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(team.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
              {activeTab === 'users' && users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.full_name}</td>
                  <td><span className={`${styles.roleBadge} ${user.role === 'admin' ? styles.admin : styles.user}`}>{user.role}</span></td>
                  <td>{user.createdAt}</td>
                  <td>
                    <button className={styles.editBtn} onClick={() => handleEdit(user)}>✏️</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(user.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
              {activeTab === 'tournaments' && tournaments.map(tournament => (
                <tr key={tournament.id}>
                  <td>{tournament.id}</td>
                  <td>{tournament.name}</td>
                  <td>{tournament.date}</td>
                  <td>{tournament.discipline}</td>
                  <td><span className={`${styles.statusBadge} ${styles[tournament.status]}`}>{tournament.status === 'active' ? 'Активен' : tournament.status === 'completed' ? 'Завершен' : 'Предстоящий'}</span></td>
                  <td>
                    <button className={styles.editBtn} onClick={() => handleEdit(tournament)}>✏️</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(tournament.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Footer />
      
      {/* Модальное окно */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
            <h3 className={styles.modalTitle}>
              {editingItem ? 'Редактировать' : 'Добавить'} 
              {activeTab === 'teams' && ' команду'}
              {activeTab === 'users' && ' пользователя'}
              {activeTab === 'tournaments' && ' турнир'}
            </h3>
            
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              {activeTab === 'teams' && (
                <>
                  <input type="text" name="name" placeholder="Название команды" value={formData.name} onChange={handleInputChange} className={styles.modalInput} required />
                  <input type="text" name="logo" placeholder="URL логотипа" value={formData.logo} onChange={handleInputChange} className={styles.modalInput} required />
                  <input type="text" name="captain" placeholder="Капитан" value={formData.captain} onChange={handleInputChange} className={styles.modalInput} required />
                </>
              )}
              
              {activeTab === 'users' && (
                <>
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className={styles.modalInput} required />
                  <input type="text" name="full_name" placeholder="Полное имя" value={formData.full_name} onChange={handleInputChange} className={styles.modalInput} required />
                  {!editingItem && <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleInputChange} className={styles.modalInput} required />}
                  <select name="role" value={formData.role} onChange={handleInputChange} className={styles.modalSelect}>
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                  </select>
                </>
              )}
              
              {activeTab === 'tournaments' && (
                <>
                  <input type="text" name="tournamentName" placeholder="Название турнира" value={formData.tournamentName} onChange={handleInputChange} className={styles.modalInput} required />
                  <input type="text" name="tournamentDate" placeholder="Дата (дд-мм)" value={formData.tournamentDate} onChange={handleInputChange} className={styles.modalInput} required />
                  <input type="text" name="tournamentDiscipline" placeholder="Дисциплина" value={formData.tournamentDiscipline} onChange={handleInputChange} className={styles.modalInput} required />
                  <select name="tournamentStatus" value={formData.tournamentStatus} onChange={handleInputChange} className={styles.modalSelect}>
                    <option value="upcoming">Предстоящий</option>
                    <option value="active">Активен</option>
                    <option value="completed">Завершен</option>
                  </select>
                </>
              )}
              
              <button type="submit" className={styles.modalSubmit}>
                {editingItem ? 'Сохранить' : 'Добавить'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};