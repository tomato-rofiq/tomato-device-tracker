// this file is for sharing login state across the entire app without passing props down through every component

import { createContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { GoogleUser } from '../types/user.types';
import { log } from '../services/logger';

// The structure of the decoded JWT token from Google
interface DecodedToken {
  sub: string; // The unique identifier for the user (Google ID)
  email: string;
  name: string;
  picture: string;
  exp: number; // The expiration time of the token (in seconds)
}

// The shape of the authentication context
interface AuthContextType {
  user: GoogleUser | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the authentication context with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);

// The provider component that wraps the app and provides the authentication state
export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<GoogleUser | null>(() => {
    const token = sessionStorage.getItem('auth_token'); // Retrieve the JWT token from session storage
    if (!token) return null;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp * 1000 < Date.now()) { // Check if the token has expired (typically exp is 1hr from issuance)
        log.info('auth: stored token expired, clearing');
        sessionStorage.removeItem('auth_token');
        return null;
      }
      log.debug('auth: restored session for', decoded.email);
      return {
        googleId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        imageUrl: decoded.picture,
        accessToken: token,
      };
    } catch (err) {
      log.warn('auth: failed to decode stored token', err);
      return null;
    }
  });

  // Function to handle login by decoding the JWT token and setting the user state
  const login = useCallback((token: string) => {
    sessionStorage.setItem('auth_token', token); // Store the JWT token in session storage
    const decoded = jwtDecode<DecodedToken>(token);
    log.info('auth: login', decoded.email);
    setUser({
      googleId: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      imageUrl: decoded.picture,
      accessToken: token,
    });
  }, []);

  // Function to handle logout by clearing the user state
  const logout = useCallback(() => {
    log.info('auth: logout');
    sessionStorage.removeItem('auth_token');
    setUser(null);
  }, []);

  const contextValue = {
    user, // The current GoogleUser object, or null if not authenticated
    isAuthenticated: !!user, // A boolean indicating whether the user is authenticated
    login, // The function to log in the user
    logout, // The function to log out the user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
