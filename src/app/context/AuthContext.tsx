"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type User = {
  id?: string;
  name?: string;
  email?: string;
} | null;

type AuthContextType = {
  signIn: (user: User | null) => void;
  signOut: () => void;
  user: User;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => false,
  signOut: () => false,
  user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = () => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
