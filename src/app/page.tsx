"use client";

import { useState } from "react";

interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string | null;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchImages = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );

      const data = await res.json();

      if (data.results && Array.isArray(data.results)) {
        setImages(data.results);
      } else {
        console.error("Unsplash error:", data);
        setImages([]);
        setError("Failed to fetch images. Check API key.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setImages([]);
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600">
        Image Vault
      </h1>
      <p className="text-gray-600 mt-2">
        Search and explore beautiful images.
      </p>

      {/* Search */}
      <form onSubmit={searchImages} className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p className="mt-6 text-gray-500">Loading images...</p>}

      {/* Error */}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {Array.isArray(images) &&
          images.map((img, index) => (
            <div
              key={`${img.id}-${index}`}
              className="overflow-hidden rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={img.urls.small}
                alt={img.alt_description || "Image"}
                className="w-full h-48 object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
      </div>
    </main>
  );
}
