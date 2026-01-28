import "./Rooms.css";

const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    price: "$180 / night",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    description: "Elegant room with warm lighting and city skyline view.",
  },
  {
    id: 2,
    name: "Executive Suite",
    price: "$320 / night",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    description: "Luxury suite with premium furniture and night ambience.",
  },
  {
    id: 3,
    name: "Presidential Suite",
    price: "$520 / night",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    description: "Top-level experience with panoramic city night view.",
  },
];

function Rooms() {
  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <h1>Our Luxury Rooms</h1>
        <p>Experience night elegance and five-star comfort</p>
      </div>

      <div className="rooms-grid">
        {rooms.map((room) => (
          <div className="room-card" key={room.id}>
            <div
              className="room-image"
              style={{ backgroundImage: `url(${room.image})` }}
            ></div>

            <div className="room-content">
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <div className="room-footer">
                <span className="price">{room.price}</span>
                <button>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;

