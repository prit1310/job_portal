// src/store/auth.d.ts

import { ReactNode } from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  storeTokenInLS: (serverToken: string) => void;
  LogoutUser: () => void;
}

export const AuthContext: React.Context<AuthContextType | undefined>;

export const AuthProvider: (props: { children: ReactNode }) => JSX.Element;

export const useAuth: () => AuthContextType;
