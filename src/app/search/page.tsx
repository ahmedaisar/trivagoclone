
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import DynamicMap from '@/components/DynamicMap';
import { StarIcon } from '@heroicons/react/solid';

interface Hotel {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  latitude: number;
  longitude: number;
  popularity: number;
}

const SearchResultsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [rating, setRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [showMap, setShowMap] = useState<boolean>(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const allAmenities = useMemo(() => {
    const amenities = new Set<string>();
    hotels.forEach(hotel => {
      hotel.amenities.forEach(amenity => amenities.add(amenity));
    });
    return Array.from(amenities);
  }, [hotels]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/hotels');
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        const data = await response.json();
        setHotels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  const filteredHotels = useMemo(() => {
    return hotels
      .filter((hotel) => {
        const priceFilter = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
        const ratingFilter = hotel.rating >= rating;
        const amenityFilter = selectedAmenities.length === 0 || selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
        return priceFilter && ratingFilter && amenityFilter;
      })
      .sort((a, b) => {
        if (sortBy === 'price') {
          return a.price - b.price;
        } else if (sortBy === 'rating') {
          return b.rating - a.rating;
        } else if (sortBy === 'popularity') {
          return b.popularity - a.popularity;
        }
        return 0;
      });
  }, [hotels, priceRange, rating, sortBy, selectedAmenities]);

  if (loading) return <div className="text-center py-12">Loading hotels...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border border-gray-300 rounded-md">
              <option value="popularity">Popularity</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
            <button onClick={() => setShowMap(!showMap)} className="bg-white p-2 rounded-md shadow-sm font-semibold border border-gray-300">{showMap ? 'List View' : 'Map View'}</button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Filter by</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price range</label>
                  <input type="range" id="priceRange" min="0" max="1000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Guest rating</label>
                  <select id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))} className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="0">All ratings</option>
                    <option value="4">4+ stars</option>
                    <option value="3">3+ stars</option>
                    <option value="2">2+ stars</option>
                    <option value="1">1+ star</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Amenities</h3>
                  <div className="mt-2 space-y-2">
                    {allAmenities.map(amenity => (
                      <div key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={amenity} className="ml-3 text-sm text-gray-600">{amenity}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-9">
            {showMap ? (
              <div className="w-full h-[600px] rounded-lg shadow-md overflow-hidden">
                <DynamicMap hotels={filteredHotels} />
              </div>
            ) : (
              <div className="space-y-6">
                {filteredHotels.map((hotel) => (
                  <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                      <div className="w-1/3">
                        <img className="h-full w-full object-cover" src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt={hotel.name} />
                      </div>
                      <div className="w-2/3 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                          <div className="flex items-center mt-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className={`h-5 w-5 ${i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">({hotel.rating})</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">${hotel.price}</p>
                            <p className="text-xs text-gray-500">per night</p>
                          </div>
                          <span className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">View Deal</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
