import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios, { isAxiosError } from 'axios';

// serverApi
export const serverApi = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  withCredentials: true
})

interface User {
  id: string;
  fullName: string;
  email: string;
  type: string;
  description: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await serverApi.get('/auth', { withCredentials: true });
        console.log(response);
        setUser(response.data.data);
      } catch (error) {
        console.error('User not authenticated');
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await serverApi.post('/auth/login', { email, password }, { withCredentials: true });
      const response = await serverApi.get('/auth', { withCredentials: true });
      setUser(response.data.data);
    } catch (error) {
      console.error('Login failed');
    }
  };

  const logout = async() => {
    try {
      await serverApi.get('/auth/logout', {withCredentials: true});
      setUser(null);
      
    } catch (error) {
      if (isAxiosError(error)){
        console.log(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;