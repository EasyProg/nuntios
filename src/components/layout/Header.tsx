"use client";
import { useAuth } from "@/app/context/AuthContext";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DropdownMenu } from "radix-ui";
import { toast } from "react-toastify";
import { UsersProps } from "../types";
import { ChatCreateDialog } from "./createChat/ChatCreateDialog";

export const Header: React.FC<UsersProps> = ({ users }) => {
  const { user } = useAuth();
  const router = useRouter();
  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .post("/api/signout")
      .then(() => {
        toast.info(`Successfully logged out`, {
          position: "top-right",
        });
      })
      .catch((error) => {
        toast.error(`${error.status}-${error.message}`, {
          position: "top-right",
        });
      })
      .finally(() => {
        router.push("/signin");
      });
  };

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <HamburgerMenuIcon
            className="hover:cursor-pointer hover:zinc-400"
            color="#606060"
            width={24}
            height={24}
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] rounded-md bg-sinc-700 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item className="group relative flex h-[30px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 bg-black hover:bg-zinc-800 hover:cursor-pointer">
              Settings
              <div className="ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                ⌘+S
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={handleSignOut}
              className="group relative flex h-[30px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 bg-black hover:bg-zinc-800 hover:cursor-pointer"
            >
              Logout
              <div className="ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                ⌘+E
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <p>{user?.name}</p>
      <ChatCreateDialog users={users} />
    </div>
  );
};
