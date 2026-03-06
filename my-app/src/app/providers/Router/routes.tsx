// Импортируем типы из react-router-dom
import type { RouteObject } from 'react-router-dom';

// Импортируем страницы
import { HomePage } from '../../../pages/HomePage';
import { TournamentsPage } from '../../../pages/TournamentsPage';
import { DisciplinesPage } from '../../../pages/DisciplinesPage';
import { TeamsPage } from '../../../pages/TeamsPage';
import { MediaPage } from '../../../pages/MediaPage';
import { FAQPage } from '../../../pages/FAQPage';
import { ContactsPage } from '../../../pages/ContactsPage';
import { ProfilePage } from '../../../pages/ProfilePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/tournaments',
    element: <TournamentsPage />,
  },
  {
    path: '/disciplines',
    element: <DisciplinesPage />,
  },
  {
    path: '/teams',
    element: <TeamsPage />,
  },
  {
    path: '/media',
    element: <MediaPage />,
  },
  {
    path: '/faq',
    element: <FAQPage />,
  },
  {
    path: '/contacts',
    element: <ContactsPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
];