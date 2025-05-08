// import Sidebar from "@/components/layout/Sidebar";

import { MessageInput } from "@/components/messages/MessageInput";
import { MessageList } from "@/components/messages/MessageList";

export default async function ChatPage() {
  return (
    <div className="flex items-center justify-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <MessageList />
      <MessageInput />
    </div>
  );
}
