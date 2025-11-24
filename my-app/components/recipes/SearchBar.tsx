'use client';

import { useState } from 'react';

export default function SearchBar() {
    const [query, setQuery] = useState('');

    return (
        <div className="max-w-md mx-auto mb-8 text-orange-600">
            <input
                type="text"
                placeholder="Search recipes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-orange-600"
            />
        </div>
    );
}