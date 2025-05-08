"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  signIn: (user: string) => void;
  signOut: () => void;
  loading: boolean;
  user: string | null;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => false,
  signOut: () => false,
  loading: false,
  user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = () => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
