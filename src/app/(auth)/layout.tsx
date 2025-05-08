import { centerLayout } from "@/components/ui/consts";
import { Toast } from "radix-ui";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Toast.Provider swipeDirection="right">
      <div className={centerLayout}>{children}</div>
    </Toast.Provider>
  );
}
