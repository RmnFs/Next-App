'use client';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const BurgerIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );

    const CloseIcon = () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center relative">
                
                {/* 1. LEFT: Logo */}
                <Link href="/" className="text-xl md:text-2xl font-bold text-orange-600 shrink-0">
                    FoodHub
                </Link>

                {/* 2. CENTER: Main Nav (Hidden on Mobile) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6">
                    <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">Home</Link>
                    <Link href="/about" className="text-gray-600 hover:text-orange-600 font-medium">About</Link>
                    <Link href="/how-it-works" className="text-gray-600 hover:text-orange-600 font-medium">How it works</Link>
                    <Link href="/recipes" className="text-gray-600 hover:text-orange-600 font-medium">Recipes</Link>
                </div>

                {/* 3. RIGHT: Actions (Add/Manage + Burger) */}
                <div className="flex items-center gap-2 md:gap-4">
                    
                    {session ? (
                        <>
                            {/* The Buttons (Visible on Mobile & Desktop) */}
                            <div className="flex gap-2">
                                <Link href="/add-recipe" className="bg-orange-600 text-white text-xs md:text-sm px-3 py-2 rounded-md hover:bg-orange-700 transition">
                                    Add Food
                                </Link>
                                <Link href="/manage-recipes" className="bg-orange-600 text-white text-xs md:text-sm px-3 py-2 rounded-md hover:bg-orange-700 transition">
                                    Manage Food
                                </Link>
                            </div>

                            {/* User Name (Desktop Only) */}
                            <div className="hidden md:relative md:block">
                                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="font-bold text-orange-600">
                                    {session.user?.name?.split(' ')[0]}
                                </button>
                                {/* Desktop Sign Out Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg border rounded-md py-1">
                                        <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link href="/login" className="hidden md:block text-orange-600 font-bold border border-orange-600 px-4 py-1 rounded">
                            Login
                        </Link>
                    )}

                    {/* Burger Button (Visible on Mobile) */}
                    <button 
                        className="md:hidden text-gray-700 ml-1" 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <CloseIcon /> : <BurgerIcon />}
                    </button>
                </div>
            </div>

            {/* 4. MOBILE MENU DROPDOWN */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg">
                    <Link href="/" className="text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="/about" className="text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link href="/how-it-works" className="text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>How it works</Link>
                    <Link href="/recipes" className="text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>Recipes</Link>
                    
                    {/* Mobile Sign Out / Login */}
                    {session ? (
                        <button onClick={() => signOut()} className="text-left text-red-500 font-medium">
                            Sign out ({session.user?.name})
                        </button>
                    ) : (
                        <Link href="/login" className="text-orange-600 font-bold">Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
}