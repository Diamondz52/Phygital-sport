import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { DisciplinesPage } from '../pages/DisciplinesPage';
import { FAQPage } from '../pages/FAQPage';
import './styles/index.scss';

// Временные заглушки для других страниц
const TournamentsPage = () => <div style={{paddingTop: '100px', color: 'white', textAlign: 'center'}}>Турниры (в разработке)</div>;
const TeamsPage = () => <div style={{paddingTop: '100px', color: 'white', textAlign: 'center'}}>Команды (в разработке)</div>;
const MediaPage = () => <div style={{paddingTop: '100px', color: 'white', textAlign: 'center'}}>Медиацентр (в разработке)</div>;
const ContactsPage = () => <div style={{paddingTop: '100px', color: 'white', textAlign: 'center'}}>Контакты (в разработке)</div>;
const ProfilePage = () => <div style={{paddingTop: '100px', color: 'white', textAlign: 'center'}}>Личный кабинет (в разработке)</div>;
const RegisterPage = () => <div style={{paddingTop: '100px', color: 'white', textAlign: 'center'}}>Регистрация (в разработке)</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/disciplines" element={<DisciplinesPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;