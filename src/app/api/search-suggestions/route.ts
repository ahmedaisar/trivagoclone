
import { NextResponse } from 'next/server';

const destinations = [
  { id: 1, name: 'New York' },
  { id: 2, name: 'London' },
  { id: 3, name: 'Paris' },
  { id: 4, name: 'Tokyo' },
  { id: 5, name: 'Dubai' },
  { id: 6, name: 'Singapore' },
  { id: 7, name: 'Barcelona' },
  { id: 8, name: 'Rome' },
  { id: 9, name: 'Madrid' },
  { id: 10, name: 'Amsterdam' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(filteredDestinations);
}
