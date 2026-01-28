import { useEffect, useState } from "react";
import "./App.css";

type Room = {
  id: number;
  name: string;
  price: number;
  description: string;
};

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rooms")
      .then(res => {
        if (!res.ok) {
          throw new Error("API error");
        }
        return res.json();
      })
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API FAILED", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>🏨 Zain Luxury Hotel</h1>
          <p>Experience comfort, elegance, and perfection</p>
          <button className="primary-btn">Explore Rooms</button>
        </div>
      </section>

      {/* ROOMS */}
      <section className="rooms">
        <h2>Our Rooms</h2>

        {loading && <p className="status">Loading rooms...</p>}

        {error && (
          <p className="status error">
            Failed to load rooms. Backend not reachable.
          </p>
        )}

        <div className="rooms-grid">
          {rooms.map(room => (
            <div className="room-card" key={room.id}>
              <div className="room-header">
                <h3>{room.name}</h3>
                <span>${room.price}/night</span>
              </div>
              <p>{room.description}</p>
              <button className="secondary-btn">Book Now</button>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2026 Zain Hotel — Luxury Redefined</p>
      </footer>
    </div>
  );
}

export default App;

