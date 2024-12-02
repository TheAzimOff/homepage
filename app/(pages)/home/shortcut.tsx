import { ShortcutProps } from "@/lib/types";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";

export default function Shortcut({
  shortcuts,
  index,
  setShortcuts,
  shortcut,
  setIsModalOpen,
  setDefaultModalValues,
}: ShortcutProps) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const optionsButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOptionsVisible(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !optionsButtonRef.current?.contains(event.target as Node) &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOptionsVisible(false);
      }
    };

    if (isOptionsVisible) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOptionsVisible]);

  const handleDelete = (id: string) => {
    setIsOptionsVisible(false);
    const newShortcuts = shortcuts.filter((item) => item.id !== id);
    setShortcuts(newShortcuts);
  };

  const handleEdit = () => {
    setIsOptionsVisible(false);
    setDefaultModalValues({
      title: shortcut.title,
      url: shortcut.url,
      id: shortcut.id,
    });
    setIsModalOpen(true);
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
      className={`relative cursor-pointer border-zinc-800 bg-zinc-800/5 p-4 backdrop-blur-sm transition-colors hover:bg-zinc-600/80 ${index % 2 === 0 ? "border-r" : ""} ${(index % 2 !== 0 && index + 1 <= shortcuts.length) || index + 2 <= shortcuts.length ? "border-b" : ""}`}
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
            className={`absolute bottom-1 right-12 text-sm ${isOptionsVisible ? "" : "hidden"} flex flex-col rounded bg-zinc-900 shadow-sm shadow-zinc-600`}
            ref={modalRef}
          >
            <button
              className="flex items-center p-1 px-2 transition-colors hover:bg-zinc-800"
              onClick={(e) => {
                e.preventDefault();
                handleDelete(shortcut.id);
              }}
            >
              <MdOutlineDelete className="text-red-500" />
              Remove
            </button>
            <button
              className="flex items-center p-1 px-2 transition-colors hover:bg-zinc-800"
              onClick={(e) => {
                e.preventDefault();
                handleEdit();
              }}
            >
              <MdOutlineModeEdit />
              Edit Shortcut
            </button>
          </div>
          <div
            className="rounded-full p-2 transition-colors hover:bg-zinc-400"
            onClick={(e) => {
              e.preventDefault();
              setIsOptionsVisible(!isOptionsVisible);
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
