// this file defines the scan page which holds the QR scanner component 
// that allows users to scan a QR code to view device details. 

import { useNavigate } from 'react-router-dom';
import { QRScanner } from '../components/QRScanner';
import { useAuth } from '../hooks/useAuth';

export function ScanPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();


  const handleScan = (result: string) => {
    const pcId = result.split('/pc/')[1];
    if (!pcId) return;

    if (isAuthenticated) {
      navigate(`/pc/${pcId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      {user && <p className="text-sm text-gray-500">Signed in as {user.name}</p>}
      <h1 className="text-2xl font-bold">Scan a Device</h1>
      <QRScanner onScan={handleScan} />

    </div>
  );
}
