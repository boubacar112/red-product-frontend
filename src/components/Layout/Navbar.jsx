import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Recherche"
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-800"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-dark-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="text-sm font-medium">{user?.name}</span>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <span>🚪</span>
                  <span>Se déconnecter</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;