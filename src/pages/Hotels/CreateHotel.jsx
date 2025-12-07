import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { hotelAPI } from '../../api/hotel';

const CreateHotel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    prix_par_nuit: '',
    devise: 'XOF',
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await hotelAPI.createHotel(data);
      if (response.success) {
        navigate('/hotels');
      }
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/hotels" className="text-gray-600 hover:text-gray-800 mb-4 inline-block">
          ← Retour
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">
          Créer un nouveau hôtel
        </h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom de l'hôtel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'hôtel
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="CAP Marniane"
              className="input-field"
              required
            />
            {errors.nom && (
              <p className="text-red-600 text-sm mt-1">{errors.nom[0]}</p>
            )}
          </div>

          {/* Email & Téléphone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="information@gmail.com"
                className="input-field"
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="+221 77 777 77 77"
                className="input-field"
                required
              />
              {errors.telephone && (
                <p className="text-red-600 text-sm mt-1">{errors.telephone[0]}</p>
              )}
            </div>
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            <textarea
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              placeholder="Les îles du saloum, Mar Lodj"
              rows="3"
              className="input-field"
              required
            ></textarea>
            {errors.adresse && (
              <p className="text-red-600 text-sm mt-1">{errors.adresse[0]}</p>
            )}
          </div>

          {/* Prix & Devise */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix par nuit
              </label>
              <input
                type="number"
                name="prix_par_nuit"
                value={formData.prix_par_nuit}
                onChange={handleChange}
                placeholder="25.000"
                className="input-field"
                required
              />
              {errors.prix_par_nuit && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.prix_par_nuit[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Devise
              </label>
              <select
                name="devise"
                value={formData.devise}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="XOF"> XOF</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ajouter une photo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {preview ? (
                <div>
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 mx-auto mb-4"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setFormData({ ...formData, photo: null });
                    }}
                    className="text-red-600 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-gray-400 mb-2">📷</div>
                  <p className="text-gray-600 mb-4">Ajouter une photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                  >
                    Choisir une image
                  </label>
                </div>
              )}
            </div>
            {errors.photo && (
              <p className="text-red-600 text-sm mt-1">{errors.photo[0]}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Création...' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHotel;