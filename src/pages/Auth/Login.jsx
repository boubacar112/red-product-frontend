import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
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
    setError('');
    setLoading(true);

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Erreur de connexion');
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
            Connectez-vous en tant que Admin
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Entrez vos identifiants pour accéder au dashboard
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 text-dark-800 border-gray-300 rounded focus:ring-dark-800"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Gardez-moi connecté
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <Link
              to="/forgot-password"
              className="text-yellow-600 hover:text-yellow-700 text-sm font-medium block"
            >
              Mot de passe oublié?
            </Link>
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte?{' '}
              <Link
                to="/register"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;