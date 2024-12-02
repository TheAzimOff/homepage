import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { cn } from "./lib/utils/cn";
import React from "react";
import Wrapper from "./components/ui/wrapper";

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
        <Wrapper>
          <aside className="w-14">
            <Sidebar />
          </aside>
          <main className="h-full w-full">{children}</main>
        </Wrapper>
      </body>
    </html>
  );
}
