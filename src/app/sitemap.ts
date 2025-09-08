
import { MetadataRoute } from 'next';

interface Hotel {
  id: number;
}

async function getHotels(): Promise<Hotel[]> {
  try {
    const response = await fetch('http://localhost:3001/api/hotels');
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hotels = await getHotels();

  const hotelEntries: MetadataRoute.Sitemap = hotels.map((hotel) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotel.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/search`,
      lastModified: new Date(),
    },
    ...hotelEntries,
  ];
}
