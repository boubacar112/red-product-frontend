import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!formData.acceptTerms) {
      setErrors({ acceptTerms: 'Vous devez accepter les termes et conditions' });
      setLoading(false);
      return;
    }

    const result = await register(formData);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors(result.errors || { general: result.message });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-white mb-4">
            <span className="text-3xl">🏨</span>
            <h1 className="text-2xl font-bold">RED PRODUCT</h1>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-2">
            Inscrivez-vous en tant que Admin
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Créez votre compte pour commencer
          </p>

          {errors.general && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom complet"
                className="input-field"
                required
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="input-field"
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
                required
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password[0]}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            {/* Accept Terms */}
            <div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-dark-800 border-gray-300 rounded focus:ring-dark-800 mt-1"
                />
                <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
                  Accepter les termes et la politique
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-600 text-sm mt-1">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </form>

          {/* Link to Login */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Vous avez déjà un compte?{' '}
            <Link
              to="/login"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;