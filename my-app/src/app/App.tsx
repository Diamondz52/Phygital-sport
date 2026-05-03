import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../features/auth/model';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { TournamentsPage } from '../pages/TournamentsPage';
import { DisciplinesPage } from '../pages/DisciplinesPage';
import { TeamsPage } from '../pages/TeamsPage';
import { MediaPage } from '../pages/MediaPage';
import { FAQPage } from '../pages/FAQPage';
import { ContactsPage } from '../pages/ContactsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { AdminPage } from '../pages/AdminPage';
import './styles/index.scss';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>  {/* <-- Должен быть MainLayout, оборачивающий все страницы */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/disciplines" element={<DisciplinesPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;