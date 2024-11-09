import React, { createContext, useContext, useState, useEffect } from 'react';
import { emailSchema, passwordSchema } from '../utils/validation';
import { mockApi } from '../services/mockApi';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const userData = await mockApi.validateToken(token);
      setUser(userData);
    } catch (err) {
      localStorage.removeItem('auth_token');
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const validateCredentials = (email: string, password: string) => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (err) {
      throw new Error('Invalid credentials');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      validateCredentials(email, password);

      const { token, user } = await mockApi.login(email, password);
      localStorage.setItem('auth_token', token);
      setUser(user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw new Error(message);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setError(null);
      validateCredentials(email, password);

      const { token, user } = await mockApi.signup(email, password);
      localStorage.setItem('auth_token', token);
      setUser(user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await mockApi.logout(token);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};