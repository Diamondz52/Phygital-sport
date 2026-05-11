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

interface DisciplineImage {
  id: number;
  url: string;
  title: string;
}

interface TournamentApplication {
  id: number;
  teamName: string;
  phone: string;
  additionalInfo: string;
  tournament: string;
  date: string;
  status: string;
}

interface ContactQuestion {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: string;
}

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'users' | 'tournaments' | 'images' | 'applications' | 'questions'>('teams');
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [disciplineImages, setDisciplineImages] = useState<DisciplineImage[]>([]);
  const [applications, setApplications] = useState<TournamentApplication[]>([]);
  const [questions, setQuestions] = useState<ContactQuestion[]>([]);
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
    tournamentStatus: 'upcoming',
    imageUrl: '',
    imageTitle: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTeams([
        { id: 1, name: 'New Dimension', logo: '/src/shared/assets/images/team1.png', captain: 'Алексей Иванов', players: [] },
        { id: 2, name: 'Cyber Warriors', logo: '/src/shared/assets/images/team2.png', captain: 'Екатерина Морозова', players: [] },
      ]);
      
      setUsers([
        { id: 1, email: 'admin@xpoint.ru', full_name: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
        { id: 2, email: 'user@example.com', full_name: 'Test User', role: 'user', createdAt: '2024-01-15' },
      ]);
      
      setTournaments([
        { id: 1, name: 'Фиджитал Баскетбол 2026', date: '26-27 мая', discipline: 'Баскетбол', status: 'upcoming' },
        { id: 2, name: 'Киберфутбол 2026', date: '10-11 июня', discipline: 'Футбол', status: 'active' },
      ]);
      
      const savedImages = localStorage.getItem('discipline_images');
      if (savedImages) {
        setDisciplineImages(JSON.parse(savedImages));
      } else {
        const defaultImages = [
          { id: 1, url: '/src/shared/assets/images/basketball.png', title: 'Фиджитал Баскетбол' },
          { id: 2, url: '/src/shared/assets/images/basketball1.png', title: 'Фиджитал Баскетбол 2' },
          { id: 3, url: '/src/shared/assets/images/basketball2.png', title: 'Фиджитал Баскетбол 3' },
          { id: 4, url: '/src/shared/assets/images/basketball3.png', title: 'Фиджитал Баскетбол 4' },
        ];
        setDisciplineImages(defaultImages);
        localStorage.setItem('discipline_images', JSON.stringify(defaultImages));
      }
      
      const savedApplications = localStorage.getItem('tournament_applications');
      if (savedApplications) {
        setApplications(JSON.parse(savedApplications));
      }
      
      const savedQuestions = localStorage.getItem('contact_questions');
      if (savedQuestions) {
        setQuestions(JSON.parse(savedQuestions));
      }
      
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
      tournamentName: '', tournamentDate: '', tournamentDiscipline: '', tournamentStatus: 'upcoming',
      imageUrl: '', imageTitle: ''
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
    } else if (activeTab === 'images') {
      setFormData({ ...formData, imageUrl: item.url, imageTitle: item.title });
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
      } else if (activeTab === 'images') {
        const newImages = disciplineImages.filter(img => img.id !== id);
        setDisciplineImages(newImages);
        localStorage.setItem('discipline_images', JSON.stringify(newImages));
      } else if (activeTab === 'applications') {
        const newApplications = applications.filter(app => app.id !== id);
        setApplications(newApplications);
        localStorage.setItem('tournament_applications', JSON.stringify(newApplications));
      } else if (activeTab === 'questions') {
        const newQuestions = questions.filter(q => q.id !== id);
        setQuestions(newQuestions);
        localStorage.setItem('contact_questions', JSON.stringify(newQuestions));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'teams') {
      if (editingItem) {
        setTeams(prev => prev.map(t => t.id === editingItem.id ? { ...t, name: formData.name, logo: formData.logo, captain: formData.captain, players: t.players } : t));
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
    } else if (activeTab === 'images') {
      const newImage = {
        id: editingItem ? editingItem.id : Date.now(),
        url: formData.imageUrl,
        title: formData.imageTitle
      };
      
      let newImages;
      if (editingItem) {
        newImages = disciplineImages.map(img => img.id === editingItem.id ? newImage : img);
      } else {
        newImages = [...disciplineImages, newImage];
      }
      setDisciplineImages(newImages);
      localStorage.setItem('discipline_images', JSON.stringify(newImages));
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
          <button className={`${styles.tab} ${activeTab === 'teams' ? styles.active : ''}`} onClick={() => setActiveTab('teams')}>
            Команды
          </button>
          <button className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`} onClick={() => setActiveTab('users')}>
            Пользователи
          </button>
          <button className={`${styles.tab} ${activeTab === 'tournaments' ? styles.active : ''}`} onClick={() => setActiveTab('tournaments')}>
            Турниры
          </button>
          <button className={`${styles.tab} ${activeTab === 'images' ? styles.active : ''}`} onClick={() => setActiveTab('images')}>
            Фото дисциплин
          </button>
          <button className={`${styles.tab} ${activeTab === 'applications' ? styles.active : ''}`} onClick={() => setActiveTab('applications')}>
            Заявки на турниры
          </button>
          <button className={`${styles.tab} ${activeTab === 'questions' ? styles.active : ''}`} onClick={() => setActiveTab('questions')}>
            Вопросы
          </button>
        </div>
        
        <div className={styles.tableHeader}>
          <h2 className={styles.sectionTitle}>
            {activeTab === 'teams' && 'Управление командами'}
            {activeTab === 'users' && 'Управление пользователями'}
            {activeTab === 'tournaments' && 'Управление турнирами'}
            {activeTab === 'images' && 'Управление фото для слайдера'}
            {activeTab === 'applications' && 'Заявки на турниры'}
            {activeTab === 'questions' && 'Вопросы пользователей'}
          </h2>
          {activeTab !== 'applications' && activeTab !== 'questions' && (
            <button className={styles.addButton} onClick={handleAdd}>
              + Добавить
            </button>
          )}
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
                {activeTab === 'images' && (
                  <>
                    <th>ID</th>
                    <th>Изображение</th>
                    <th>Название</th>
                    <th>Действия</th>
                  </>
                )}
                {activeTab === 'applications' && (
                  <>
                    <th>ID</th>
                    <th>Команда</th>
                    <th>Телефон</th>
                    <th>Турнир</th>
                    <th>Доп. информация</th>
                    <th>Дата</th>
                    <th>Действия</th>
                  </>
                )}
                {activeTab === 'questions' && (
                  <>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Тема</th>
                    <th>Сообщение</th>
                    <th>Дата</th>
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
              {activeTab === 'images' && disciplineImages.map(image => (
                <tr key={image.id}>
                  <td>{image.id}</td>
                  <td><img src={image.url} alt={image.title} className={styles.tableLogo} /></td>
                  <td>{image.title}</td>
                  <td>
                    <button className={styles.editBtn} onClick={() => handleEdit(image)}>✏️</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(image.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
              {activeTab === 'applications' && applications.map(app => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.teamName}</td>
                  <td>{app.phone}</td>
                  <td>{app.tournament}</td>
                  <td style={{ maxWidth: '200px' }}>{app.additionalInfo || '-'}</td>
                  <td>{new Date(app.date).toLocaleString()}</td>
                  <td>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(app.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
              {activeTab === 'questions' && questions.map(q => (
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>{q.name}</td>
                  <td>{q.email}</td>
                  <td>{q.subject}</td>
                  <td style={{ maxWidth: '250px' }}>{q.message}</td>
                  <td>{new Date(q.date).toLocaleString()}</td>
                  <td>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(q.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Footer />
      
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
            <h3 className={styles.modalTitle}>
              {editingItem ? 'Редактировать' : 'Добавить'} 
              {activeTab === 'teams' && ' команду'}
              {activeTab === 'users' && ' пользователя'}
              {activeTab === 'tournaments' && ' турнир'}
              {activeTab === 'images' && ' фото'}
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
              
              {activeTab === 'images' && (
                <>
                  <input type="text" name="imageUrl" placeholder="URL изображения" value={formData.imageUrl} onChange={handleInputChange} className={styles.modalInput} required />
                  <input type="text" name="imageTitle" placeholder="Название" value={formData.imageTitle} onChange={handleInputChange} className={styles.modalInput} required />
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