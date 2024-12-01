"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ShortcutType } from "@/lib/types";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ShortcutModal from "../ui/shortcutModal";
import Shortcut from "./shortcut";

export default function Shortcuts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shortcuts, setShortcuts] = useLocalStorage<ShortcutType[]>(
    "shortcuts",
    [],
  );

  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-md">
      {isModalOpen && (
        <ShortcutModal {...{ isModalOpen, setIsModalOpen, setShortcuts }} />
      )}

      {shortcuts.length !== 0 &&
        shortcuts.map((shortcut, index) => (
          <Shortcut
            {...{ index, shortcuts, setShortcuts, shortcut }}
            key={shortcut.id}
          />
        ))}

      {shortcuts.length < 12 && (
        <div
          onClick={() => setIsModalOpen(true)}
          className={`flex cursor-pointer items-center border-zinc-800 bg-zinc-900 p-4 transition-colors hover:bg-zinc-800 ${shortcuts.length % 2 == 0 ? "col-span-2 grid place-items-center" : ""}`}
        >
          <button className="flex items-center gap-2 text-sm text-violet-500 transition-colors hover:text-violet-400">
            <FiPlus className="h-5 w-5" />
            <span>Add shortcut</span>
          </button>
        </div>
      )}
    </div>
  );
}
