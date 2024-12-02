"use client";
import { UserContext } from "@/components/ui/wrapper";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useContext } from "react";

export default function Settings() {
  const [username, setUsername] = useLocalStorage("username", "");
  const [userCity, setUserCity] = useLocalStorage("userCity", "");
  const { bgUrl, bgDimIntensity, setBgDimIntensity, setBgUrl } =
    useContext(UserContext);

  return (
    <div
      className="w-full text-zinc-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <form className="h-full w-full">
        <div className="p-6">
          <h2 id="modal-title" className="mb-4 text-xl font-semibold">
            Settings
          </h2>
          <div className="mb-6">
            <label htmlFor="name" className="mb-1 block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-zinc-600 bg-transparent px-4 py-2 text-lg outline-none placeholder:text-zinc-300 focus:border-zinc-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="city" className="mb-1 block text-lg font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              value={userCity}
              onChange={(e) => setUserCity(e.target.value)}
              className="w-full rounded-md border border-zinc-600 bg-transparent px-4 py-2 text-lg outline-none placeholder:text-zinc-300 focus:border-zinc-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="bgUrl" className="mb-1 block text-lg font-medium">
              Background Image URL{" "}
              <span className="italic text-zinc-300/75">(optional)</span>
            </label>
            <input
              type="text"
              id="bgUrl"
              value={bgUrl}
              onChange={(e) => setBgUrl!(e.target.value)}
              className="w-full rounded-md border border-zinc-600 bg-transparent px-4 py-2 text-lg outline-none placeholder:text-zinc-300 focus:border-zinc-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="bgUrl" className="mb-1 block text-lg font-medium">
              Background Dim Intensity: 100%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              id="bgUrl"
              value={bgDimIntensity}
              onChange={(e) => setBgDimIntensity!(+e.target.value)}
              className="w-full rounded-md bg-transparent py-2 text-lg outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
