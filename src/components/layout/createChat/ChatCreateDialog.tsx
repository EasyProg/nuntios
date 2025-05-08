"use client";

// import { createChat } from "@/app/actions/createChat";
import { useMapUsers } from "@/components/hooks";
import { UsersProps } from "@/components/types";
import { buttonClass } from "@/components/ui/consts";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { Form } from "radix-ui";
import { useState } from "react";
import Select, { MultiValue } from "react-select";
import { toast } from "react-toastify";

interface Option {
  value: number;
  label: string | null;
}

export const ChatCreateDialog: React.FC<UsersProps> = ({ users }) => {
  const [nameValue, setNameValue] = useState("");
  const modifiedUsers = useMapUsers(users);
  const [usersValue, setUsersValue] =
    useState<MultiValue<Option>>(modifiedUsers);

  const handleChatCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!nameValue || usersValue.length === 0) {
      toast.warning("Please input information!");
      return;
    }
    const newChat = await axios
      .post("/api/chat", {
        name: nameValue,
        users: usersValue,
      })
      .catch((error) => {
        // if (error.status == 409) {
        //   toast.error(`User already exists`, {
        //     position: "top-right",
        //   });
        //   return;
        // }
        toast.error(`${error.status}-${error.message}`, {
          position: "top-right",
        });
      });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <PlusIcon
          color="#606060"
          className="hover:cursor-pointer hover:color-zinc-400"
          width={24}
          height={24}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-900 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Create chat
          </Dialog.Title>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-violet11"
              htmlFor="name"
            >
              Chat Name
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
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
            <button className={buttonClass} onClick={handleChatCreate}>
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
