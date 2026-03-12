import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { TournamentsPage } from '../pages/TournamentsPage';
import { DisciplinesPage } from '../pages/DisciplinesPage';
import { TeamsPage } from '../pages/TeamsPage';
import { MediaPage } from '../pages/MediaPage';
import { FAQPage } from '../pages/FAQPage';
import { ContactsPage } from '../pages/ContactsPage';
import { ProfilePage } from '../pages/ProfilePage';
import './styles/index.scss';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;