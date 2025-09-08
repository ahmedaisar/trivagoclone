
'use client';

import React from 'react';

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <p className="font-bold mr-2">{review.author}</p>
              <p className="text-yellow-500 font-semibold">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
