'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getFoodById, type Food } from '@/lib/api';

export default function RecipeDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      if (!id || typeof id !== 'string') {
        setError('Invalid recipe ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getFoodById(id);
        setRecipe(data);
        if (!data) {
          setError('Recipe not found');
        }
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-orange-600 text-xl">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe || error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-orange-600 mb-4">{error || 'Recipe not found.'}</p>
        <button
          onClick={() => router.push('/recipes')}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto text-center py-16 px-4">
      <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
        <Image
          src={recipe.img}
          alt={recipe.title}
          fill
          className="object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold text-orange-600 mb-4">
        {recipe.title}
      </h1>

      <p className="text-orange-600 mb-8 leading-relaxed">{recipe.desc}</p>

      {/* ─── Meta Info ─── */}
      <div className="flex justify-center gap-6 text-sm text-orange-600 mb-8">
        <span>💰 {recipe.meta.price}</span>
        <span>🕑 {recipe.meta.prepTime}</span>
        <span>🎯 {recipe.meta.difficulty}</span>
      </div>

      {/* ─── Recipe Steps ─── */}
      {Array.isArray(recipe.recipe) && recipe.recipe.length > 0 && (
        <div className="text-left bg-orange-50 border border-orange-200 rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-center">
            Recipe Steps
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-orange-600">
            {recipe.recipe.map((step, index) => (
              <li key={index} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-400 transition"
      >
        ← Back
      </button>
    </section>
  );
}