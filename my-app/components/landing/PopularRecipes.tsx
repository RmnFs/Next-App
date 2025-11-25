'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllFoods, type Food } from '@/lib/api';

export default function PopularRecipes() {
    const [recipes, setRecipes] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const data = await getAllFoods();
                // Show only first 6 recipes
                setRecipes(data.slice(0, 6));
            } catch (err) {
                console.error('Failed to fetch recipes:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipes();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-orange-50 text-center">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">
                        Popular Recipes
                    </h2>
                    <div className="text-orange-600">Loading...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-orange-50 text-center">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">
                    Popular Recipes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map((r) => (
                        <a
                            key={r._id}
                            href={`/recipes/${r._id}`}
                            className="bg-white p-6 border rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1"
                        >
                            <div className="relative w-full h-40 mb-3 rounded overflow-hidden">
                                <Image
                                    src={r.img}
                                    alt={r.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-orange-600">{r.title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2">{r.desc}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}