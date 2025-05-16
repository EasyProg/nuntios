// import Sidebar from "@/components/layout/Sidebar";

import { getUsers } from "@/app/actions";
import getChats from "@/app/actions/getChats";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function ChatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chats = await getChats();
  const users = await getUsers();
  return (
    <div className="flex items-start w-100">
      <Sidebar chats={chats ?? []} users={users} />
      {children}
    </div>
  );
}
