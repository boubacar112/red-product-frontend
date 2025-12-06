import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

// Pages d'authentification
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Pages protégées
import Dashboard from './pages/Dashboard';
import HotelList from './pages/Hotels/HotelList';
import CreateHotel from './pages/Hotels/CreateHotel';
import EditHotel from './pages/Hotels/EditHotel';

// Layout
import Layout from './components/Layout/layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques (authentification) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Routes protégées */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hotels" element={<HotelList />} />
            <Route path="hotels/create" element={<CreateHotel />} />
            <Route path="hotels/edit/:id" element={<EditHotel />} />
          </Route>

          {/* Route 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;