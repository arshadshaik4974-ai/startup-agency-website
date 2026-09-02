import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicHome } from './pages/PublicHome';
import { WeddingPage } from './pages/WeddingPage';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminSetup2FA } from './pages/admin/AdminSetup2FA';
import { AdminVerify2FA } from './pages/admin/AdminVerify2FA';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminSettings } from './pages/admin/AdminSettings';
import { RequireAuth } from './pages/admin/RequireAuth';
import { AdminLayout } from './pages/admin/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/wedding" element={<WeddingPage />} />
          
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Routes Wrapper */}
          <Route element={<RequireAuth />}>
            <Route path="/admin/setup-2fa" element={<AdminSetup2FA />} />
            <Route path="/admin/verify-2fa" element={<AdminVerify2FA />} />
            
            {/* Fully Protected Dashboard / Settings */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
