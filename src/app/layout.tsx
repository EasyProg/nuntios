import { GlobeIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuntios",
  description: "Powered by idea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-stone-800 backdrop-blur-2xl h-15 shadow-xl font-mono shadow-cyan-500/50 backdrop-blur-lg flex justify-center text-lg items-center">
          <p className="text-cyan-500">Nuntios v.0.1</p>
          <GlobeIcon width={24} height={24} color="#606060" />
        </div>
        <div>{children}</div>
        <ToastContainer />
      </body>
    </html>
  );
}
