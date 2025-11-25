'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/recipes/SearchBar';

export default function RecipesPage() {
  const [allFoods, setAllFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await fetch('http://localhost:8080/api/foods');
        const data = await res.json();
        setAllFoods(data);
        setFilteredFoods(data);
      } catch (err) {
        console.error('Failed to fetch foods:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  const handleSearch = (term: string) => {
    const lower = term.toLowerCase();
    if (!lower.trim()) {
      setFilteredFoods(allFoods);
      return;
    }
    setFilteredFoods(
      allFoods.filter(
        (r: any) =>
          r.title.toLowerCase().includes(lower) ||
          r.desc.toLowerCase().includes(lower)
      )
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-orange-600 text-xl">Loading recipes...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white text-center px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">Our Recipes</h1>
        <p className="text-gray-600 mb-10">
          Explore authentic dishes crafted with flavor and passion.
        </p>

        <SearchBar onSearch={handleSearch} />

        {filteredFoods.length === 0 ? (
          <p className="text-orange-600">No recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredFoods.map((r: any) => (
              <a
                key={r._id}
                href={`/recipes/${r._id}`}
                className="block border rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1 bg-white"
              >
                <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                  <Image
                    src={r.img}
                    alt={r.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                  />
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-lg font-semibold text-orange-600 mb-1">
                    {r.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {r.desc}
                  </p>
                  <p className="text-orange-600 font-medium">
                    {r.meta?.prepTime}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}