'use client';

import React from 'react';

export function GuestSelector() {
  const [guests, setGuests] = React.useState(1);

  return (
    <select
      value={guests}
      onChange={(e) => setGuests(parseInt(e.target.value, 10))}
      className="w-full p-4 border border-gray-300 rounded-lg"
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num} guest{num > 1 ? 's' : ''}
        </option>
      ))}
    </select>
  );
}
