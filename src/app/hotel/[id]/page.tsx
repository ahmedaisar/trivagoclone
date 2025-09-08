'use client';

import React, { useState, useEffect } from 'react';
import { NextSeo, HotelJsonLd } from 'next-seo';
import Reviews from '@/components/Reviews';
import { StarIcon } from '@heroicons/react/solid';

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
}

interface Hotel {
  id: number;
  name: string;
  price: number;
  rating: number;
  description: string;
  amenities: string[];
  photos: string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  reviews: Review[];
}

const HotelDetailsPage = ({ params }: { params: { id: string } }) => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const getHotel = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/hotels/${params.id}`);
        if (!response.ok) {
          throw new Error('Hotel not found');
        }
        const data = await response.json();
        setHotel(data);
        setSelectedPhoto(data.photos[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getHotel();
  }, [params.id]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (!hotel) return <div className="text-center py-12">Hotel not found</div>;

  return (
    <>
      <NextSeo
        title={`${hotel.name} | Trivago Clone`}
        description={hotel.description}
      />
      <HotelJsonLd
        name={hotel.name}
        description={hotel.description}
        address={hotel.address}
        images={hotel.photos}
        starRating={{
          ratingValue: hotel.rating.toString(),
          bestRating: '5',
        }}
        priceRange={`$${hotel.price}`}
        reviews={hotel.reviews.map(review => ({
          author: review.author,
          reviewRating: {
            ratingValue: review.rating.toString(),
            bestRating: '5',
          },
          reviewBody: review.comment,
        }))}
      />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={selectedPhoto || hotel.photos[0]} alt={hotel.name} className="w-full h-[400px] object-cover" />
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {hotel.photos.map((photo, index) => (
                    <img 
                      key={index} 
                      src={photo} 
                      alt={`${hotel.name} thumbnail ${index + 1}`}
                      onClick={() => setSelectedPhoto(photo)}
                      className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 ${selectedPhoto === photo ? 'border-blue-500' : 'border-transparent'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{hotel.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`h-5 w-5 ${i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({hotel.rating} based on {hotel.reviews.length} reviews)</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-600">
                  {hotel.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Reviews reviews={hotel.reviews} />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Deals</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <img src="/booking-logo.png" alt="Booking.com" className="h-6" />
                    <span className="text-xl font-bold text-green-600">${hotel.price}</span>
                    <a href="#" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">View Deal</a>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <img src="/expedia-logo.png" alt="Expedia" className="h-6" />
                    <span className="text-xl font-bold text-green-600">${hotel.price + 10}</span>
                    <a href="#" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">View Deal</a>
                  </div>
                  <div className="flex justify-between items-center">
                    <img src="/hotels-logo.png" alt="Hotels.com" className="h-6" />
                    <span className="text-xl font-bold text-green-600">${hotel.price + 5}</span>
                    <a href="#" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">View Deal</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetailsPage;