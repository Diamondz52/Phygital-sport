import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  full_name: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, full_name: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api';

// Ключ для localStorage
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// Данные администратора
const ADMIN_EMAIL = 'pyankovad2606@gmail.com';
const ADMIN_PASSWORD = 'Midzxc09';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка пользователя из localStorage при инициализации
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const savedUser = localStorage.getItem(USER_KEY);
        
        if (token && savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          console.log('Пользователь загружен из localStorage:', parsedUser.email);
        }
      } catch (error) {
        console.error('Ошибка загрузки пользователя из localStorage:', error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setIsLoading(false);
        return;
      }

      // TODO: Здесь будет запрос к бэкенду для проверки токена
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Login with:', { email, password });
      
      // Проверка на администратора
      const isAdmin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
      
      let mockUser: User;
      let mockToken: string;
      
      if (isAdmin) {
        mockUser = { 
          id: 1, 
          email, 
          full_name: 'Администратор', 
          role: 'admin' 
        };
        mockToken = 'admin-token-' + Date.now();
        console.log('Вход выполнен как администратор');
      } else {
        // Обычный пользователь
        mockUser = { 
          id: Date.now(), 
          email, 
          full_name: email.split('@')[0],
          role: 'user' 
        };
        mockToken = 'user-token-' + Date.now();
        console.log('Вход выполнен как пользователь');
      }
      
      // Сохраняем в localStorage
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      
      setUser(mockUser);
      console.log('Вход выполнен, данные сохранены в localStorage');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, full_name: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Register with:', { email, full_name, password });
      
      const mockUser: User = { 
        id: Date.now(), 
        email, 
        full_name,
        role: 'user' 
      };
      const mockToken = 'user-token-' + Date.now();
      
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      
      setUser(mockUser);
      console.log('Регистрация выполнена, данные сохранены в localStorage');
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    console.log('Выход выполнен, localStorage очищен');
  };

  // Периодическая проверка сохраненных данных
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === TOKEN_KEY || e.key === USER_KEY) {
        if (!e.newValue) {
          setUser(null);
        } else if (e.key === USER_KEY && e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch {
            setUser(null);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};