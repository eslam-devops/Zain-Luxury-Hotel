CREATE TABLE IF NOT EXISTS rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  room_id INTEGER NOT NULL,
  guest_name VARCHAR(100) NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_room
    FOREIGN KEY (room_id)
    REFERENCES rooms(id)
    ON DELETE CASCADE,
  CONSTRAINT valid_booking_dates CHECK (check_out > check_in)
);

CREATE INDEX IF NOT EXISTS idx_bookings_room_id ON bookings(room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);

INSERT INTO rooms (name, price, description) VALUES
('Single Room', 100, 'Cozy room for one'),
('Double Room', 180, 'Spacious room for two'),
('Suite', 350, 'Luxury suite with view'),
('Family Room', 280, 'Perfect for families')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
