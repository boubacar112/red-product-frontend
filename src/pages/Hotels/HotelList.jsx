import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hotelAPI } from '../../api/hotel';

const HotelList = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    prix_min: '',
    prix_max: '',
    devise: '',
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const params = {
        search: searchTerm,
        ...filters,
      };
      const response = await hotelAPI.getHotels(params);
      if (response.success) {
        setHotels(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des hôtels', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotels();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet hôtel ?')) {
      try {
        await hotelAPI.deleteHotel(id);
        fetchHotels();
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
        alert('Erreur lors de la suppression de l\'hôtel');
      }
    }
  };

  const getImageUrl = (photo) => {
    if (!photo) return 'https://via.placeholder.com/400x300?text=Hotel';
    return `${import.meta.env.VITE_STORAGE_URL}/${photo}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-800"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Liste des hôtels</h1>
          <p className="text-gray-600 mt-1">Hôtels ({hotels.length})</p>
        </div>
        <Link
          to="/hotels/create"
          className="btn-primary flex items-center gap-2"
        >
          <span>+</span>
          <span>Créer un nouveau hôtel</span>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            placeholder="Rechercher un hôtel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 input-field"
          />
          <input
            type="number"
            placeholder="Prix min"
            value={filters.prix_min}
            onChange={(e) => setFilters({ ...filters, prix_min: e.target.value })}
            className="w-32 input-field"
          />
          <input
            type="number"
            placeholder="Prix max"
            value={filters.prix_max}
            onChange={(e) => setFilters({ ...filters, prix_max: e.target.value })}
            className="w-32 input-field"
          />
          <button type="submit" className="btn-primary">
            Rechercher
          </button>
        </form>
      </div>

      {/* Hotels Grid */}
      {hotels.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">Aucun hôtel trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={getImageUrl(hotel.photo)}
                  alt={hotel.nom}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Hotel';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{hotel.adresse}</p>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {hotel.nom}
                </h3>
                <p className="text-sm font-semibold text-gray-700 mb-4">
                  {hotel.prix_par_nuit} {hotel.devise} par nuit
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/hotels/edit/${hotel.id}`)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(hotel.id)}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelList;