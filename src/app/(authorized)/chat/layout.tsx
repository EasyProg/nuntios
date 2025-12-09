import { getUsers } from "@/app/actions";
import getChats from "@/app/actions/getChats";
import { UsersProvider } from "@/app/context/UsersContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Spinner } from "@radix-ui/themes";
import { Suspense } from "react";

export default async function ChatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chats = await getChats();
  const users = await getUsers();
  return (
    <Suspense fallback={<Spinner />}>
      <UsersProvider initialUsers={users}>
        <div className="flex items-start">
          <Sidebar chats={chats ?? []} users={users} />
          {children}
        </div>
      </UsersProvider>
    </Suspense>
  );
}
