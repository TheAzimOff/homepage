"use client";
import { useState } from "react";

export default function GoogleSearch() {
  const [query, setQuery] = useState("");

  return (
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
  );
}
