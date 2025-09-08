
'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Hotel {
  id: number;
  name: string;
  price: number;
  latitude: number;
  longitude: number;
}

interface MapProps {
  hotels: Hotel[];
}

const Map: React.FC<MapProps> = ({ hotels }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotels.map(hotel => (
        <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
          <Popup>
            <strong>{hotel.name}</strong><br />
            ${hotel.price} per night
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
