import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { ScanPage } from './pages/ScanPage';
import { DeviceDetailPage } from './pages/DeviceDetailPage';
import { QRGeneratorPage } from './pages/QRGeneratorPage';
import { DeviceListPage } from './pages/DeviceListPage';
import { QRPrintPage } from './pages/QRPrintPage';

// The Google Client ID is loaded from environment variables, defaulting to an empty string if not set
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ScanPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/device/:id" element={
              <ProtectedRoute>
                <DeviceDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/device/:id/qr" element={
              <ProtectedRoute>
                <QRPrintPage />
              </ProtectedRoute>
            } />
            <Route path="/qr" element={
              <ProtectedRoute>
                <QRGeneratorPage />
              </ProtectedRoute>
            } />
            <Route path="/devices" element={
              <ProtectedRoute>
                <DeviceListPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App
