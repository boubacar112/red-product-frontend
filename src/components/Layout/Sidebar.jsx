import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: '📊',
    },
    {
      name: 'Liste des hôtels',
      path: '/hotels',
      icon: '🏨',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-dark-800 min-h-screen text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dark-700">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏨</span>
          <h1 className="text-xl font-bold">RED PRODUCT</h1>
        </div>
      </div>

      {/* Section */}
      <div className="px-4 py-4">
        <p className="text-gray-400 text-sm font-medium mb-3">Principal</p>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-dark-700 text-white'
                  : 'text-gray-300 hover:bg-dark-700 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="mt-auto p-4 border-t border-dark-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-dark-600 rounded-full flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{user?.name || 'Utilisateur'}</p>
            <p className="text-xs text-green-400">en ligne</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;