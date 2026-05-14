// this file is for sharing login state across the entire app without passing props down through every component

import { createContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { GoogleUser } from '../types/user.types';

// The structure of the decoded JWT token from Google
interface DecodedToken {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

// The shape of the authentication context
interface AuthContextType {
  user: GoogleUser | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  // mockLogin: () => void;
}

// Create the authentication context with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);

// The provider component that wraps the app and provides the authentication state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GoogleUser | null>(null);

  // Function to handle login by decoding the JWT token and setting the user state
  const login = useCallback((token: string) => {
    const decoded = jwtDecode<DecodedToken>(token);
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
