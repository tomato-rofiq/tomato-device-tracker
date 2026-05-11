// this file defines the scan page which holds the QR scanner component 
// that allows users to scan a QR code to view device details. 
// It also integrates Google One Tap login for authentication.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { QRScanner } from '../components/QRScanner';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export function ScanPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scannedId, setScannedId] = useState<string | null>(null);

  // Set up Google One Tap login with a callback function that handles the successful login response
  useGoogleOneTapLogin({
    onSuccess: (response) => {
      if (response.credential) {
        login(response.credential);
      }
    },
    auto_select: true, // Automatically select the account if the user is already signed in
    disabled: !scannedId, // Disable One Tap login until a QR code has been scanned to prevent unnecessary prompts
  });

  // If already authenticated, navigate immediately. Otherwise store the ID and wait for login.
  const handleScan = (result: string) => {
    const pcId = result.split('/pc/')[1];
    if (!pcId) return;

    if (isAuthenticated) {
      navigate(`/pc/${pcId}`);
    } else {
      setScannedId(pcId);
    }
  };

  // Navigate to the PC detail page once both a scan and login have completed.
  useEffect(() => {
    if (isAuthenticated && scannedId) {
      navigate(`/pc/${scannedId}`);
    }
  }, [isAuthenticated, scannedId, navigate]);


  // If a QR code has been scanned but the user is not authenticated, show a message prompting them to sign in
  if (scannedId && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg">Please sign in to view device details</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Scan a Device</h1>
      <QRScanner onScan={handleScan} />
    </div>
  );
}
