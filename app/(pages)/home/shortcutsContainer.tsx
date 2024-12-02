"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ShortcutType } from "@/lib/types";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ShortcutModal from "@/components/ui/shortcutModal";
import Shortcut from "./shortcut";

export default function ShortcutsContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shortcuts, setShortcuts] = useLocalStorage<ShortcutType[]>(
    "shortcuts",
    [],
  );
  const [defaultModalValues, setDefaultModalValues] = useState<ShortcutType>({
    title: "",
    id: "",
    url: "",
  });

  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-md">
      {isModalOpen && (
        <ShortcutModal
          {...{
            isModalOpen,
            setIsModalOpen,
            shortcuts,
            setShortcuts,
            defaultModalValues,
            setDefaultModalValues,
          }}
        />
      )}

      {shortcuts.length !== 0 &&
        shortcuts.map((shortcut, index) => (
          <Shortcut
            {...{
              index,
              shortcuts,
              setShortcuts,
              shortcut,
              defaultModalValues,
              setDefaultModalValues,
              setIsModalOpen,
            }}
            key={shortcut.id}
          />
        ))}

      {shortcuts.length < 12 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className={`flex cursor-pointer flex-row items-center justify-center border-zinc-800 bg-zinc-800/5 p-4 text-violet-500 backdrop-blur-sm transition-colors hover:bg-zinc-600/80 hover:text-violet-400 ${shortcuts.length % 2 == 0 ? "col-span-2" : ""}`}
        >
          <FiPlus className="h-5 w-5" />
          <span>Add shortcut</span>
        </button>
      )}
    </div>
  );
}
