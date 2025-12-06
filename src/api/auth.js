import axios from './axios';



export const authAPI = {
  // Inscription
  register: async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  },

  // Connexion
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    const response = await axios.post('/logout');
    return response.data;
  },

  // Obtenir l'utilisateur connecté
  me: async () => {
    const response = await axios.get('/me');
    return response.data;
  },

  // Mot de passe oublié
  forgotPassword: async (email) => {
    const response = await axios.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Réinitialiser le mot de passe
  resetPassword: async (data) => {
    const response = await axios.post('/auth/reset-password', data);
    return response.data;
  },
};