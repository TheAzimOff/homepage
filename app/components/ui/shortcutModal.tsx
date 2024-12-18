import { ShortcutType } from "@/lib/types";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import { generateShortcutId } from "@/lib/utils/generateShortcutId";

interface ShortcutModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShortcuts: React.Dispatch<React.SetStateAction<ShortcutType[]>>;
  defaultModalValues: ShortcutType;
  setDefaultModalValues: React.Dispatch<React.SetStateAction<ShortcutType>>;
}

export default function ShortcutModal({
  isModalOpen,
  setIsModalOpen,
  setShortcuts,
  setDefaultModalValues,
  defaultModalValues,
}: ShortcutModalProps) {
  const [title, setTitle] = useState(defaultModalValues.title);
  const [url, setUrl] = useState(defaultModalValues.url);
  const modalRef = useRef<HTMLDivElement>(null);
  const [urlError, setUrlError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
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
  }, [isModalOpen, setIsModalOpen]);

  const validateUrl = (inputUrl: string): boolean =>
    /\b(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^ ]*)?\b/g.test(
      inputUrl,
    );

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setUrlError(false);
    setTitleError(false);

    // Validate inputs
    const isValidTitle = title.trim().length > 0;
    const isValidUrl = validateUrl(url);

    // Validate before processing
    if (!isValidTitle) {
      // Set specific errors
      setTitleError(true);
      return;
    }
    if (!isValidUrl) {
      setUrlError(true);
      return;
    }

    // Determine if we're adding a new shortcut or updating existing
    const isNewShortcut = defaultModalValues.id === "";

    // Prepare shortcut data
    const shortcutData = {
      title,
      url,
    };

    // Update shortcuts based on whether it's a new or existing shortcut
    setShortcuts((prevShortcuts) =>
      isNewShortcut
        ? [
            ...prevShortcuts,
            {
              id: generateShortcutId(),
              ...shortcutData,
            },
          ]
        : prevShortcuts.map((shortcut) =>
            shortcut.id === defaultModalValues.id
              ? { ...shortcut, ...shortcutData }
              : shortcut,
          ),
    );

    // Reset modal state
    setIsModalOpen(false);
    setTitle("");
    setUrl("");
    setDefaultModalValues({ title: "", url: "", id: "" });
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className="mx-auto w-full max-w-md rounded-lg bg-zinc-800/50 text-zinc-300 shadow-xl backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <form onSubmit={handleSave} className="h-full w-full">
          <div className="p-6">
            <h2 id="modal-title" className="mb-4 text-xl font-semibold">
              Add Shortcut
            </h2>
            <div className="mb-4">
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Name{" "}
                {titleError && (
                  <i className="text-red-700">Title cannot be empty</i>
                )}
              </label>
              <input
                type="text"
                id="name"
                value={title}
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-zinc-600 bg-transparent px-4 py-2 outline-none placeholder:text-zinc-300 focus:border-zinc-300"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="url" className="mb-1 block text-sm font-medium">
                URL{" "}
                {urlError && <i className="text-red-700">Enter a valid URL</i>}
              </label>
              <div className="flex w-full items-center">
                <label htmlFor="url" className="select-none font-mono text-lg">
                  https://
                </label>
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-md border border-zinc-600 bg-transparent px-4 py-2 outline-none placeholder:text-zinc-300 focus:border-zinc-300"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                type="reset"
                className="rounded-md border border-zinc-600 px-4 py-2 text-zinc-300 transition-colors hover:bg-zinc-300/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-violet-500 px-4 py-2 text-zinc-300 transition-colors hover:bg-violet-500/70"
              >
                Save
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-zinc-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
