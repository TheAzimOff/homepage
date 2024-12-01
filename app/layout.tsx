import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { cn } from "./lib/utils/cn";
import React from "react";

const HostGrotesk = Host_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homepage",
  description: "A tool with useful shortcuts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("bg-background text-foreground", HostGrotesk.className)}
      >
          <div className="flex h-screen w-full">
            <aside className="w-14">
              <Sidebar />
            </aside>
            <main className="h-full w-full">{children}</main>
          </div>
      </body>
    </html>
  );
}
