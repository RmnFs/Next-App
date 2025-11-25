'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createFood } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AddRecipePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    price: '',
    prepTime: '',
    difficulty: 'Easy',
    image: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error('You must be logged in to add a recipe');
      return;
    }

    setSubmitting(true);

    try {
      const newRecipe = {
        title: form.title,
        desc: form.fullDesc,
        img: form.image || 'https://via.placeholder.com/300x200.png?text=Food',
        meta: {
          price: form.price || '$0',
          difficulty: form.difficulty,
          prepTime: form.prepTime || 'N/A',
        },
        recipe: form.shortDesc, // Add recipe field if needed
        email: session.user.email, // Include user email
      };

      await createFood(newRecipe);
      toast.success('✅ Recipe added successfully!');
      router.push('/manage-recipes');
    } catch (error) {
      console.error('Failed to add recipe:', error);
      toast.error('❌ Failed to add recipe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Add New Recipe
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border border-orange-200 p-6 rounded-lg bg-white shadow-sm"
      >
        <label className="block text-orange-600 font-medium">Title</label>
        <input
          name="title"
          placeholder="Enter recipe title"
          onChange={handleChange}
          required
          className="border border-orange-300 w-full p-3 rounded text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />

        <label className="block text-orange-600 font-medium">
          Short Description
        </label>
        <input
          name="shortDesc"
          placeholder="Enter short description"
          onChange={handleChange}
          required
          className="border border-orange-300 w-full p-3 rounded text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />

        <label className="block text-orange-600 font-medium">Full Description</label>
        <textarea
          name="fullDesc"
          placeholder="Write full recipe details..."
          onChange={handleChange}
          required
          className="border border-orange-300 w-full p-3 rounded h-32 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-orange-600 font-medium">Price</label>
            <input
              name="price"
              placeholder="e.g. $12"
              onChange={handleChange}
              className="border border-orange-300 p-3 rounded w-full text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          <div>
            <label className="block text-orange-600 font-medium">Prep Time</label>
            <input
              name="prepTime"
              placeholder="e.g. 45 min"
              onChange={handleChange}
              className="border border-orange-300 p-3 rounded w-full text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          <div>
            <label className="block text-orange-600 font-medium">Difficulty</label>
            <select
              name="difficulty"
              onChange={handleChange}
              className="border border-orange-300 p-3 rounded w-full text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        <label className="block text-orange-600 font-medium">Image URL</label>
        <input
          name="image"
          placeholder="Paste image URL (optional)"
          onChange={handleChange}
          className="border border-orange-300 w-full p-3 rounded text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-orange-500 text-white py-3 rounded font-semibold hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Adding Recipe...' : 'Add Recipe'}
        </button>
      </form>
    </main>
  );
}