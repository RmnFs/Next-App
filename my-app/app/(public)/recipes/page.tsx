'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/recipes/SearchBar';
import { getAllFoods, type Food } from '@/lib/api';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const data = await getAllFoods();
        setRecipes(data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white text-center px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-orange-600 text-xl">Loading recipes...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white text-center px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-red-600 text-xl">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white text-center px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">
          Our Recipes
        </h1>
        <p className="text-gray-600 mb-10">
          Explore authentic dishes crafted with flavor and passion.
        </p>

        <SearchBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {recipes.map((r) => (
            <a
              key={r._id}
              href={`/recipes/${r._id}`}
              className="block border rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1 bg-white"
            >
              {/* Image section */}
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

              {/* Text section */}
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-orange-600 mb-1">
                  {r.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {r.desc}
                </p>
                <p className="text-orange-600 font-medium">
                  {r.meta.prepTime}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}