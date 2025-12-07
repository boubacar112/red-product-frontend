import axios from './axios';

export const hotelAPI = {
  // Obtenir les statistiques du dashboard
  getStats: async () => {
    const response = await axios.get('/dashboard/stats');
    return response.data;
  },

  // Obtenir la liste des hôtels avec filtres
  getHotels: async (params = {}) => {
    // Filtrer les paramètres vides pour éviter les erreurs 500 du backend
    const filteredParams = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== '' && value !== null && value !== undefined) {
        filteredParams[key] = value;
      }
    }
    const response = await axios.get('/hotels', { params: filteredParams });
    return response.data;
  },

  // Obtenir un hôtel spécifique
  getHotel: async (id) => {
    const response = await axios.get(`/hotels/${id}`);
    return response.data;
  },

  // Créer un hôtel (avec photo)
  createHotel: async (formData) => {
    const response = await axios.post('/hotels', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Modifier un hôtel (avec photo)
  updateHotel: async (id, formData) => {
    const response = await axios.post(`/hotels/${id}?_method=PUT`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Supprimer un hôtel
  deleteHotel: async (id) => {
    const response = await axios.delete(`/hotels/${id}`);
    return response.data;
  },
};