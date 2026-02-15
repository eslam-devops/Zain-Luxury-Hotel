import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

type Room = {
  id: number;
  name: string;
  price: number;
  description: string;
};

function Booking() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null as Room | null);
  const [guestName, setGuestName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/rooms`);
        const rooms = (await response.json()) as Room[];
        const selectedRoom = rooms.find((item) => String(item.id) === String(roomId));
        setRoom(selectedRoom || null);
        if (!selectedRoom) {
          setMessage('Room not found. Please go back and choose another room.');
        }
      } catch (error) {
        setMessage('Unable to load room details right now.');
      } finally {
        setIsLoadingRoom(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: roomId,
          guest_name: guestName,
          check_in: checkIn,
          check_out: checkOut,
        }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Booking failed');
      }

      setMessage('Booking created successfully 🎉');
      setGuestName('');
      setCheckIn('');
      setCheckOut('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page">
      <h1>Book Your Room</h1>

      {isLoadingRoom && <p className="mt-20">Loading room details...</p>}

      {!isLoadingRoom && room && (
        <>
          <p className="mt-20">
            Room: <strong>{room.name}</strong> — ${room.price} / night
          </p>
          <form className="form" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Guest Name"
              value={guestName}
              onChange={(e: any) => setGuestName(e.target.value)}
              required
            />
            <input
              type="date"
              value={checkIn}
              onChange={(e: any) => setCheckIn(e.target.value)}
              required
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e: any) => setCheckOut(e.target.value)}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </>
      )}

      <button className="mt-20" type="button" onClick={() => navigate('/rooms')}>
        Back to Rooms
      </button>

      {message && <p className="form-message mt-20">{message}</p>}
    </section>
  );
}

export default Booking;
