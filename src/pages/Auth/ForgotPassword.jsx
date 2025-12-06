import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const result = await authAPI.forgotPassword(email);
      if (result.success) {
        setMessage('Lien de réinitialisation envoyé par email');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi');
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
            Mot de passe oublié?
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
            instructions sur la façon de modifier votre mot de passe.
          </p>

          {message && (
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="input-field"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
            >
              Revenir à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;