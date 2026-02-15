import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './Rooms.css';

type Room = {
  id: number;
  name: string;
  price: number;
  description: string;
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
];

function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([] as Room[]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setError('');
        const response = await fetch(`${API_BASE_URL}/api/rooms`);

        if (!response.ok) {
          throw new Error('Failed to load rooms');
        }

        const data = (await response.json()) as Room[];
        setRooms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unexpected error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <h1>Our Luxury Rooms</h1>
        <p>Experience night elegance and five-star comfort</p>
      </div>

      {isLoading && <p className="mt-20">Loading rooms...</p>}
      {!isLoading && error && <p className="mt-20">{error}</p>}
      {!isLoading && !error && rooms.length === 0 && (
        <p className="mt-20">No rooms are available right now.</p>
      )}

      {!isLoading && !error && rooms.length > 0 && (
        <div className="rooms-grid">
          {rooms.map((room: any, index: number) => (
            <div className="room-card" key={room.id}>
              <div
                className="room-image"
                style={{
                  backgroundImage: `url(${fallbackImages[index % fallbackImages.length]})`,
                }}
              />

              <div className="room-content">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <div className="room-footer">
                  <span className="price">${room.price} / night</span>
                  <button type="button" onClick={() => navigate(`/book/${room.id}`)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rooms;
