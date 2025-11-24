'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          FoodHub
        </Link>

        <div className="hidden md:flex space-x-6 text-black items-center">
          <Link href="/">Home</Link>
          <Link href="/recipes">Recipes</Link>

          {session ? (
            <div className="relative group">
              <button className="font-medium">
                {session.user?.name?.split(' ')[0]} ▾
              </button>
              <div className="absolute hidden group-hover:block bg-white border shadow-lg right-0 mt-2 w-40">
                <Link
                  href="/add-recipe"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Add Recipe
                </Link>
                <Link
                  href="/manage-recipes"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Manage Recipes
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 border rounded"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}