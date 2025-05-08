import { User } from "@prisma/client";
import { useMemo } from "react";

export const useMapUsers = (users: User[]) => {
  const modifiedUsers = useMemo(() => {
    return users.map((user) => ({ value: user.id, label: user.name }));
  }, [users]);
  return modifiedUsers;
};
