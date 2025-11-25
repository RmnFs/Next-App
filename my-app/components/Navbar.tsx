'use client';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-orange-600">
                    FoodHub
                </Link>

                <div className="flex gap-6 items-center">
                    <Link href="/recipes" className="text-orange-600 hover:text-orange-300">Recipes</Link>
                    

                    {session ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 text-orange-600 hover:text-orange-800"
                            >
                                <span>{session.user?.name?.split(' ')[0]}</span>
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 py-2 border border-gray-100">
                                    <Link
                                        href="/add-recipe"
                                        className="block px-4 py-2 hover:bg-orange-50 text-sm text-orange-600"
                                        onClick={() => setOpen(false)}
                                    >
                                        Add Food
                                    </Link>
                                    <Link
                                        href="/manage-recipes"
                                        className="block px-4 py-2 hover:bg-orange-50 text-sm text-orange-600"
                                        onClick={() => setOpen(false)}
                                    >
                                        Manage Food
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-orange-50 text-sm text-orange-600"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="text-orange-600 border border-orange-600 px-4 py-2 rounded hover:bg-orange-50 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}