"use client";

import { useChats } from "@/app/context/ChatsContext";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

type SearchUsersDialogProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const SearchChatsDialog: React.FC<SearchUsersDialogProps> = ({
  open: initialOpen = false,
  onOpenChange,
}) => {
  const { chats } = useChats();
  const router = useRouter();

  return (
    <Dialog.Root open={initialOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-800 p-[30px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title
            hidden
            className="m-0 text-[17px] font-medium text-mauve12"
          >
            Select user
          </Dialog.Title>
          {chats.length > 10 ? (
            <TextField.Root
              placeholder="Search friends ... "
              className="mb-5"
              variant="soft"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon className="mr-2" height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          ) : null}
          <div className="flex">
            {chats.map((chat, id) => (
              <div
                className="rounded-md bg-cyan-900 p-1 mr-2 cursor-pointer"
                key={`${id}${chat.id}`}
                onClick={() => router.push(`/chat/${chat.chatId}`)}
              >
                {chat.name}
              </div>
            ))}
          </div>
          <Dialog.Close>
            <Cross1Icon
              className="absolute right-2.5 top-2.5 hover:cursor-pointer hover:zinc-400"
              color="#606060"
              width={24}
              height={24}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
