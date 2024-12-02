"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, ReactNode } from "react";

export const UserContext = createContext<{
  bgUrl: string;
  bgDimIntensity: number;
  setBgDimIntensity?: React.Dispatch<React.SetStateAction<number>>;
  setBgUrl?: React.Dispatch<React.SetStateAction<string>>;
}>({ bgDimIntensity: 0, bgUrl: "" });

export default function Wrapper({ children }: { children: ReactNode }) {
  const [bgUrl, setBgUrl] = useLocalStorage("bgUrl", "");
  const [bgDimIntensity, setBgDimIntensity] = useLocalStorage(
    "bgDimIntensity",
    0,
  );

  return (
    <div
      className={`relative flex h-screen w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-black/${bgDimIntensity}`}
      style={{
        backgroundImage: `url(${bgUrl != "" ? bgUrl : "https://images.unsplash.com/photo-1732468928980-a294bc2845d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyOTI5NjJ8MHwxfGFsbHw2fHx8fHx8fHwxNzMzMDc5Nzg0fA&ixlib=rb-4.0.3&q=80&w=1080"})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <UserContext.Provider
        value={{ bgUrl, setBgUrl, bgDimIntensity, setBgDimIntensity }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
}
