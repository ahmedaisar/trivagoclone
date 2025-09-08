'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DatePicker } from '@/components/DatePicker';
import { GuestSelector } from '@/components/GuestSelector';

interface Suggestion {
  id: number;
  name: string;
}

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const fetchSuggestions = async () => {
        const response = await fetch(`/api/search-suggestions?q=${query}`);
        const data = await response.json();
        setSuggestions(data);
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="w-full max-w-6xl p-8 md:p-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl">
        <h1 className="text-6xl font-bold text-center text-blue-600 mb-6">trivago</h1>
        <p className="text-xl text-center text-gray-700 mb-10">Compare hotel prices from hundreds of sites.</p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5 relative">
              <label htmlFor="destination" className="block text-sm font-bold text-gray-700 mb-1">Search for a destination</label>
              <input
                type="text"
                id="destination"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="e.g. New York"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="p-3 cursor-pointer hover:bg-gray-100 transition duration-150"
                      onClick={() => {
                        setQuery(suggestion.name);
                        setSuggestions([]);
                      }}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="md:col-span-3">
              <label htmlFor="dates" className="block text-sm font-bold text-gray-700 mb-1">Check-in / Check-out</label>
              <DatePicker />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="guests" className="block text-sm font-bold text-gray-700 mb-1">Guests</label>
              <GuestSelector />
            </div>
            <div className="md:col-span-2">
              <Link href={`/search?destination=${query}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-200 shadow-md flex items-center justify-center">
                Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
