"use client";

import { User } from "@prisma/client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type UsersContextType = {
  updateUsers: (users: User[]) => void;
  users: User[];
};

const UsersContext = createContext<UsersContextType>({
  updateUsers: () => false,
  users: [],
});

export const UsersProvider: FC<PropsWithChildren<{ initialUsers: User[] }>> = ({
  children,
  initialUsers,
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const updateUsers = (nextUsers: User[]) => {
    setUsers(nextUsers);
  };

  return (
    <UsersContext.Provider value={{ users, updateUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
