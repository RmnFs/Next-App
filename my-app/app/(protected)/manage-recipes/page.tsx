'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAllFoods, deleteFood, type Food } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ManageRecipesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userRecipes, setUserRecipes] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  // Load user recipes from backend
  useEffect(() => {
    async function fetchUserRecipes() {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const allRecipes = await getAllFoods();
        // Filter recipes by logged-in user's email
        const filtered = allRecipes.filter(
          (recipe) => recipe.email === session?.user?.email
        );
        setUserRecipes(filtered);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
        toast.error('Failed to load your recipes');
      } finally {
        setLoading(false);
      }
    }

    if (status === 'authenticated') {
      fetchUserRecipes();
    }
  }, [session, status]);

  // Delete recipe by ID
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Delete this recipe?');
    if (!confirmDelete) return;

    try {
      await deleteFood(id);
      // Remove from local state
      setUserRecipes((prev) => prev.filter((r) => r._id !== id));
      toast.success('Recipe deleted successfully');
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      toast.error('Failed to delete recipe');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <main className="max-w-5xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Manage Your Recipes
        </h1>
        <div className="text-center text-orange-600">Loading...</div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Manage Your Recipes
      </h1>

      {userRecipes.length === 0 ? (
        <p className="text-orange-600 text-center">
          You haven’t added any recipes yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userRecipes.map((r) => (
            <div
              key={r._id}
              className="border border-orange-200 rounded-lg shadow-sm hover:shadow-md bg-white transition"
            >
              <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={r.img}
                  alt={r.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-orange-600 mb-1 truncate">
                  {r.title}
                </h3>
                <p className="text-orange-600 text-sm line-clamp-2 mb-2">
                  {r.desc}
                </p>
                <p className="text-orange-600 font-medium text-sm mb-4">
                  💰 {r.meta.price} &nbsp;|&nbsp; 🕑 {r.meta.prepTime}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => router.push(`/recipes/${r._id}`)}
                    className="text-orange-600 font-medium hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => r._id && handleDelete(r._id)}
                    className="bg-orange-500 text-white px-3 py-1.5 rounded hover:bg-orange-400 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}