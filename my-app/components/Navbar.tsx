'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // mock login state for now; will use NextAuth later
  const isLoggedIn = false;

  return (
    <nav className="sticky top-0 z-50 bg-orange-50 border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="text-2xl font-bold text-orange-600">FoodHub</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-black">
          <Link href="/">Home</Link>
          <Link href="/recipes">Recipes</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          {isLoggedIn ? (
            <div className="relative group">
              <button className="font-medium">Account ▾</button>
              <div className="absolute hidden group-hover:block bg-white border shadow-lg right-0 mt-2 w-40">
                <Link
                  href="/add-product"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Add Food
                </Link>
                <Link
                  href="/manage-products"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Manage Food
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500"
            >
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 border rounded"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden text-black bg-white border-t shadow-sm space-y-2 px-4 py-3">
          <Link href="/">Home</Link>
          <Link href="/items">Items</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isLoggedIn ? (
            <>
              <Link href="/add-product">Add Food</Link>
              <Link href="/manage-products">Manage Food</Link>
              <button className="text-left w-full">Logout</button>
            </>
          ) : (
            <Link
              href="/login"
              className="block bg-orange-600 text-white px-4 py-2 rounded text-center"
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}