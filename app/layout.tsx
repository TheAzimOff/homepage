import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { cn } from "./lib/utils";

const hostGrtesk = Host_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homepage",
  description: "Modern Next.js Component Library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("bg-background text-foreground", hostGrtesk.className)}
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
