"use client";

import { createContext, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { UserContextType } from "./lib/types";

export const UserContext = createContext<UserContextType | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [userCity] = useLocalStorage("userCity", "");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <UserContext.Provider value={{ userCity, isVisible, setIsVisible }}>
      {children}
    </UserContext.Provider>
  );
}
