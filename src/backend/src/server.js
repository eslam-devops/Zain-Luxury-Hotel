const authRoutes = require('./routes/authRoutes');
const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/api/rooms', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rooms ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Rooms fetch error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/bookings', async (req, res) => {
  const guestName = req.query.guest_name;

  try {
    if (guestName) {
      const result = await pool.query(
        `SELECT b.*, r.name AS room_name
         FROM bookings b
         JOIN rooms r ON r.id = b.room_id
         WHERE LOWER(b.guest_name) = LOWER($1)
         ORDER BY b.check_in ASC`,
        [String(guestName).trim()]
      );

      return res.json(result.rows);
    }

    const result = await pool.query(
      `SELECT b.*, r.name AS room_name
       FROM bookings b
       JOIN rooms r ON r.id = b.room_id
       ORDER BY b.check_in ASC`
    );

    return res.json(result.rows);
  } catch (err) {
    console.error('Bookings fetch error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  const { room_id, guest_name, check_in, check_out } = req.body;

  if (!room_id || !guest_name || !check_in || !check_out) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const cleanGuestName = String(guest_name).trim();
  const startDate = new Date(check_in);
  const endDate = new Date(check_out);

  if (!cleanGuestName) {
    return res.status(400).json({ error: 'Guest name is required' });
  }

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  if (endDate <= startDate) {
    return res.status(400).json({ error: 'check_out must be after check_in' });
  }

  try {
    const roomResult = await pool.query('SELECT id FROM rooms WHERE id = $1', [room_id]);

    if (roomResult.rowCount === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const overlapResult = await pool.query(
      `SELECT id
       FROM bookings
       WHERE room_id = $1
         AND check_in < $3::date
         AND check_out > $2::date
       LIMIT 1`,
      [room_id, check_in, check_out]
    );

    if (overlapResult.rowCount > 0) {
      return res.status(409).json({ error: 'Room is already booked for the selected dates' });
    }

    const result = await pool.query(
      `INSERT INTO bookings (room_id, guest_name, check_in, check_out)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [room_id, cleanGuestName, check_in, check_out]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Booking insert error:', err);
    return res.status(500).json({ error: 'Insert failed' });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  const bookingId = Number(req.params.id);

  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    return res.status(400).json({ error: 'Invalid booking id' });
  }

  try {
    const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING id', [bookingId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error('Booking delete error:', err);
    return res.status(500).json({ error: 'Delete failed' });
  }
});

app.use('/api/auth', authRoutes);

const port = Number(process.env.PORT) || 8000;

app.listen(port, () => {
  console.log(`Backend running on ${port}`);
});
