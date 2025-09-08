const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const hotels = [
  {
    id: 1,
    name: 'Hotel Sunshine',
    price: 120,
    rating: 4.5,
    popularity: 0.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A beautiful hotel with a stunning view of the ocean. Perfect for a relaxing getaway.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Fitness Center', 'Restaurant', 'Spa'],
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    address: {
      streetAddress: '123 Ocean View Drive',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      postalCode: '33101',
      addressCountry: 'USA',
    },
    latitude: 25.7617,
    longitude: -80.1918,
    reviews: [
      {
        id: 1,
        author: 'John Doe',
        rating: 5,
        comment: 'Amazing hotel! The view was breathtaking and the staff was very friendly.',
      },
      {
        id: 2,
        author: 'Jane Smith',
        rating: 4,
        comment: 'Great location and comfortable rooms. The breakfast could be better.',
      },
    ],
  },
  {
    id: 2,
    name: 'Mountain View Resort',
    price: 250,
    rating: 4.8,
    popularity: 0.8,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Escape to the mountains and enjoy the fresh air and stunning views.',
    amenities: ['Free WiFi', 'Hiking Trails', 'Fireplace', 'Hot Tub'],
    photos: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    address: {
      streetAddress: '456 Mountain Pass',
      addressLocality: 'Aspen',
      addressRegion: 'CO',
      postalCode: '81611',
      addressCountry: 'USA',
    },
    latitude: 39.1911,
    longitude: -106.8175,
    reviews: [],
  },
];

app.get('/api/hotels', (req, res) => {
  const { amenities } = req.query;

  if (amenities) {
    const selectedAmenities = amenities.split(',');
    const filteredHotels = hotels.filter(hotel => 
      selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
    );
    return res.json(filteredHotels);
  }

  res.json(hotels);
});

app.get('/api/hotels/:id', (req, res) => {
  const hotel = hotels.find((h) => h.id === parseInt(req.params.id));
  if (hotel) {
    res.json(hotel);
  } else {
    res.status(404).send('Hotel not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});