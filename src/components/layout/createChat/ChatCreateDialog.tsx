"use client";

// import { createChat } from "@/app/actions/createChat";
import { useMapUsers } from "@/components/hooks/useMapUsers";
import { UsersProps } from "@/components/types";
import { formButton, formInput } from "@/components/ui/consts";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Form } from "radix-ui";
import { useState } from "react";
import Select, { MultiValue } from "react-select";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

interface Option {
  value: number;
  label: string | null;
}

export const ChatCreateDialog: React.FC<UsersProps> = ({ users }) => {
  const [nameValue, setNameValue] = useState("");
  const [open, setOpen] = useState(false);
  const modifiedUsers = useMapUsers(users);
  const [usersValue, setUsersValue] =
    useState<MultiValue<Option>>(modifiedUsers);
  const router = useRouter();

  const handleChatCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const chatId = uuidv4();
    if (!nameValue) {
      toast.warning("Please input information!");
      return;
    }
    await axios
      .post("/api/chat", {
        name: nameValue,
        users: usersValue.map((item) => ({ id: item.value })),
        chatId,
      })
      .then((res) => {
        toast.info(`Chat ${nameValue} created`);
        setOpen(false);
        router.push(`/chat/${chatId}`);
        router.refresh();
      })
      .catch((error) => {
        toast.error(`${error.status}-${error.message}`, {
          position: "top-right",
        });
      });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <PlusIcon
          color="#606060"
          className="hover:cursor-pointer hover:color-zinc-400"
          width={24}
          height={24}
          onClick={() => setOpen(true)}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-900 p-[30px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title
            hidden
            className="m-0 text-[17px] font-medium text-mauve12"
          >
            Create chat
          </Dialog.Title>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="min-w-[90px] text-right text-[15px] text-violet11"
              htmlFor="name"
            >
              Chat Name
            </label>
            <input
              className={formInput}
              id="name"
              defaultValue=""
              onChange={(e) => setNameValue(e.target.value)}
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-violet11"
              htmlFor="username"
            >
              Usernames
            </label>
            <Select
              options={modifiedUsers}
              isMulti={true}
              onChange={setUsersValue}
              classNames={{
                control: () => "!bg-zinc-900 min-w-85",
                menu: () => "!bg-zinc-900",
                option: ({ isFocused }) =>
                  isFocused ? "!bg-zinc-800" : "!bg-zinc-900",
                multiValue: () => "!bg-zinc-800",
                multiValueLabel: () => "!text-gray-300",
                multiValueRemove: () =>
                  "hover: !bg-zinc-800 hover: !text-zinc-500",
              }}
            />
          </fieldset>
          <Form.Submit asChild>
            <button className={formButton} onClick={handleChatCreate}>
              Create
            </button>
          </Form.Submit>
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
