"use client";
import Link from "next/link";
import {
  FiHome,
  FiSettings,
  FiImage,
  FiTrello,
  FiFilm,
  FiMonitor,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <nav className="flex h-full p-4 py-8 text-2xl text-zinc-300">
      <div className="flex h-full flex-col items-center justify-between">
        <Link href="/">
          <FiHome />
        </Link>
        <ul className="flex h-1/4 flex-col justify-between">
          <li>
            <Link href="/news">
              <FiTrello />
            </Link>
          </li>
          <li>
            <Link href="/hackernews">
              <FiMonitor />
            </Link>
          </li>
          <li>
            <Link href="/image">
              <FiImage />
            </Link>
          </li>
          <li>
            <Link href="/movies">
              <FiFilm />
            </Link>
          </li>
        </ul>
        <button onClick={() => console.log("clicked!")}>
          <FiSettings />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
