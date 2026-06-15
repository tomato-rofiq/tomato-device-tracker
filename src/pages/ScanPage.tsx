// this page allows users to scan a QR code on a device, 
// and redirects them to the device detail page if they are authenticated, 
// or to the login page if not. It also shows the current user's name if they are signed in.

import { useNavigate } from 'react-router-dom';
import { QRScanner } from '../components/QRScanner';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/Navbar';

export function ScanPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();


  const handleScan = (result: string) => {
    const deviceId = result.split('/device/')[1];
    if (!deviceId) return;

    if (isAuthenticated) {
      navigate(`/device/${deviceId}/edit`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <Navbar />
      {user && <p className="text-sm text-gray-500">Signed in as {user.name}</p>}
      <h1 className="text-2xl font-bold">Scan a Device</h1>
      <QRScanner onScan={handleScan} />

    </div>
  );
}
