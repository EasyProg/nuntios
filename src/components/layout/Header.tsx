"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { UsersProps } from "../types";
import { ChatCreateDialog } from "./createChat/ChatCreateDialog";

export const Header: React.FC<UsersProps> = ({ users }) => {
  return (
    <div className="flex items-center justify-between">
      <IconButton size="2" variant="ghost">
        <HamburgerMenuIcon
          className="hover:cursor-pointer hover:zinc-400"
          color="#606060"
          width={24}
          height={24}
        />
      </IconButton>
      <p>Your name</p>
      <ChatCreateDialog users={users} />
    </div>
  );
};
