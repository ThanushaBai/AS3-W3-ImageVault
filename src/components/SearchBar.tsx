"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
      <input
        type="text"
        placeholder="Search cars, nature, animals..."
       className="flex-1 p-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-400"

        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Search
      </button>
    </form>
  );
}
