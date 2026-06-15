import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { ScanPage } from './pages/ScanPage';
import { QRGeneratorPage } from './pages/QRGeneratorPage';
import { DeviceListPage } from './pages/DeviceListPage';
import { QRPrintPage } from './pages/QRPrintPage';
import { DeviceEditPage } from './pages/DeviceEditPage';
import { LoanSlipPage } from './pages/LoanSlipPage';
import { DeviceUpdateHistoryPage } from './pages/DeviceUpdateHistoryPage';

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
            <Route path="/device/:id/qr" element={ // route to print the QR code for a device
              <ProtectedRoute>
                <QRPrintPage />
              </ProtectedRoute>
            } />
            <Route path="/device/:id/edit" element={ // route to edit the device information
              <ProtectedRoute>
                <DeviceEditPage />
              </ProtectedRoute>
            } />
            <Route path="/device/:id/loan" element={ // route to generate a loan slip for a device
              <ProtectedRoute>
                <LoanSlipPage />
              </ProtectedRoute>
            } />
            <Route path="/device/:id/history" element={ // route to display the update history of a specific device
              <ProtectedRoute>
                <DeviceUpdateHistoryPage />
              </ProtectedRoute>
            } />
            <Route path="/qr" element={ // route to generate a QR code for a new device
              <ProtectedRoute>
                <QRGeneratorPage />
              </ProtectedRoute>
            } />
            <Route path="/devices" element={ // route to display the list of devices
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
