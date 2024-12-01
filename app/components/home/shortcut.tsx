import { ShortcutType } from "@/lib/types";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import React, { useEffect, useRef, useState } from "react";

export default function Shortcut({
  shortcuts,
  index,
  setShortcuts,
  shortcut,
}: {
  shortcuts: ShortcutType[];
  index: number;
  setShortcuts: React.Dispatch<React.SetStateAction<ShortcutType[]>>;
  shortcut: ShortcutType;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const optionsButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !optionsButtonRef.current?.contains(event.target as Node) &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.preventDefault();
    setIsModalOpen(false);
    console.log(index);
    console.log(shortcuts[index]);
    setShortcuts((prevValues) => prevValues.splice(index, 1));
  };

  return (
    <a
      target="_blank"
      key={shortcut.id}
      href={
        shortcut.url.startsWith("http")
          ? shortcut.url
          : `https://${shortcut.url}`
      }
      rel="noopener noreferrer"
      className={`relative cursor-pointer border-zinc-800 bg-zinc-900 p-4 transition-colors hover:bg-zinc-800 ${index % 2 === 0 ? "border-r" : ""} ${(index % 2 !== 0 && index + 1 <= shortcuts.length) || index + 2 <= shortcuts.length ? "border-b" : ""} border-zinc-800`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5">
            <img
              src={`https://api.faviconkit.com/${shortcut.url}/144`}
              alt="logo"
              width={20}
              height={20}
              className="rounded-full"
            />
          </div>
          <span className="font-medium text-zinc-300">{shortcut.title}</span>
        </div>
        <div className="cursor-pointer">
          <div
            className={`absolute bottom-1 right-12 text-sm ${isModalOpen ? "" : "hidden"} flex flex-col rounded bg-zinc-900 shadow-sm shadow-zinc-600`}
            ref={modalRef}
          >
            <button
              className="flex items-center p-1 px-2 transition-colors hover:bg-zinc-800"
              onClick={(e) => handleDelete(e, index)}
            >
              <MdOutlineDelete className="text-red-500" />
              Remove
            </button>
            <button className="flex items-center p-1 px-2 transition-colors hover:bg-zinc-800">
              <MdOutlineModeEdit />
              Edit Shortcut
            </button>
          </div>
          <div
            className="rounded-full p-2 transition-colors hover:bg-zinc-400"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(!isModalOpen);
            }}
            ref={optionsButtonRef}
          >
            <SlOptionsVertical />
          </div>
        </div>
      </div>
    </a>
  );
}
