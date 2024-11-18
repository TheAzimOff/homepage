"use client";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ShortcutType } from "@/lib/types";
import ShortcutModal from "../ui/shortcutModal";

const Search = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shortcuts, setShortcuts] = useLocalStorage<ShortcutType[]>(
    "shortcuts",
    [],
  );

  return (
    <>
      {isModalOpen && (
        <ShortcutModal {...{ isModalOpen, setIsModalOpen, setShortcuts }} />
      )}
      <div className="w-1/2">
        <div className="rounded-lg bg-zinc-950 p-6">
          <div className="search mb-8 w-full">
            <div className="search-input w-full">
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.open(`https://google.com/search?q=${query}`, "_blank");
                  setQuery("");
                }}
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search on Google"
                  className="w-full rounded-md border border-zinc-800 bg-transparent px-4 py-2 outline-none placeholder:text-zinc-300 focus:border-zinc-600"
                />
              </form>
            </div>
          </div>
          <div className="grid grid-cols-2 overflow-hidden rounded-md">
            {shortcuts.length !== 0
              ? shortcuts.map((shortcut, i) => (
                  <a
                    target="_blank"
                    // referrerPolicy="no-referrer"
                    key={shortcut.id}
                    href={
                      shortcut.url.startsWith("http")
                        ? shortcut.url
                        : `https://${shortcut.url}`
                    }
                    rel="noopener noreferrer"
                    className={`cursor-pointer border-zinc-800 bg-zinc-900 p-4 transition-colors hover:bg-zinc-800 ${i % 2 === 0 ? "border-r" : ""} ${(i % 2 !== 0 && i + 1 <= shortcuts.length) || i + 2 <= shortcuts.length ? "border-b" : ""} border-zinc-800`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 text-violet-500">
                        <img
                          src={`https://api.faviconkit.com/${shortcut.url}/144`}
                          alt="logo"
                          width={20}
                          height={20}
                        />
                      </div>
                      <span className="font-medium text-zinc-300">
                        {shortcut.title}
                      </span>
                    </div>
                  </a>
                ))
              : ""}
            {shortcuts.length < 12 && (
              <div
                onClick={() => setIsModalOpen(true)}
                className={`cursor-pointer border-zinc-800 bg-zinc-900 p-4 transition-colors hover:bg-zinc-800 ${shortcuts.length % 2 == 0 ? "col-span-2 grid place-items-center" : ""}`}
              >
                <button className="flex items-center gap-2 text-sm text-violet-500 transition-colors hover:text-violet-400">
                  <FiPlus className="h-5 w-5" />
                  <span>Add shortcut</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
