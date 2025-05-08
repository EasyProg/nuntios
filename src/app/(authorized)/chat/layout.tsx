// import Sidebar from "@/components/layout/Sidebar";

import { getUsers } from "@/app/actions";
import getChats from "@/app/actions/getChats";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function ChatsLayout() {
  const chats = await getChats(2);
  const users = await getUsers();
  console.log({ users });
  return (
    <div>
      <Sidebar chats={chats} users={users} />
    </div>
  );
}
