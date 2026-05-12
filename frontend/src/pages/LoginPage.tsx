// this page allows users to log in using their Google account, 
// and redirects to the main scan page if they are already authenticated

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  // Redirect to the scan page if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  // Set up Google One Tap login with a success callback that logs in the user
  useGoogleOneTapLogin({
    onSuccess: (response) => {
      if (response.credential) login(response.credential);
    },
    auto_select: true,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Device Tracker</h1>
      <GoogleLogin
        // The onSuccess callback is called when the user successfully logs in with Google
        onSuccess={(response) => {
          if (response.credential) login(response.credential);
        }}
        // The onError callback is called when the login process fails, and it logs an error message to the console
        onError={() => console.error('Login failed')}
      />
    </div>
  );
}
