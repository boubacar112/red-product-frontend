import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { authAPI } from '../api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authAPI.login(credentials);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de connexion',
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erreur d'inscription",
        errors: error.response?.data?.errors,
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
