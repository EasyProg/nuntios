import getMessages from "@/app/actions/getMessages";
import { ChatRoom } from "@/components/messages/ChatRoom";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const messages = await getMessages(id);

  return (
    <div
      key={id}
      className="font-[family-name:var(--font-geist-sans)] bg-zinc-900 rounded-sm w-180 w-full"
    >
      <ChatRoom messages={messages} chatId={id} />
    </div>
  );
}
