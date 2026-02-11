"use client";

import { useState } from "react";
import GenrePicker from "./GenrePicker";
import SearchInput from "@/app/components/SearchInput";

export default function Header() {
  const [genres, setGenres] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  return (
    <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="text-white font-bold text-lg">GINO JIN</div>

      <div className="flex items-center gap-3">
        <GenrePicker value={genres} onChange={setGenres} />
        <SearchInput value={search} onChange={setSearch} />
      </div>
    </header>
  );
}