import { useState, useEffect } from 'react';
import { hotelAPI } from '../api/hotel';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await hotelAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Formulaires',
      value: stats?.total_formulaires || 125,
      subtitle: 'Je ne sais pas quoi mettre',
      icon: '📧',
      bgColor: 'bg-purple-500',
    },
    {
      title: 'Messages',
      value: stats?.total_messages || 40,
      subtitle: 'Je ne sais pas quoi mettre',
      icon: '💬',
      bgColor: 'bg-teal-500',
    },
    {
      title: 'Utilisateurs',
      value: stats?.total_utilisateurs || 600,
      subtitle: 'Je ne sais pas quoi mettre',
      icon: '👥',
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'E-mails',
      value: stats?.total_emails || 25,
      subtitle: 'Je ne sais pas quoi mettre',
      icon: '📮',
      bgColor: 'bg-red-500',
    },
    {
      title: 'Hôtels',
      value: stats?.total_hotels || 40,
      subtitle: 'Je ne sais pas quoi mettre',
      icon: '🏨',
      bgColor: 'bg-purple-600',
    },
    {
      title: 'Entrées',
      value: stats?.total_entrees || 2,
      subtitle: 'Je ne sais pas quoi mettre',
      icon: '👥',
      bgColor: 'bg-blue-500',
    },
  ];

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bienvenue sur RED Product</p>
        <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet consectetur</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  {card.value}
                </h3>
                <p className="text-gray-600 font-medium mb-1">{card.title}</p>
                <p className="text-gray-400 text-sm">{card.subtitle}</p>
              </div>
              <div
                className={`${card.bgColor} w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;