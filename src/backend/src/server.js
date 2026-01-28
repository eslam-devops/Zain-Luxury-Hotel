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
    const result = await pool.query('SELECT * FROM rooms');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  const { room_id, guest_name, check_in, check_out } = req.body;

  if (!room_id || !guest_name || !check_in || !check_out) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings (room_id, guest_name, check_in, check_out)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [room_id, guest_name, check_in, check_out]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Insert failed' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running on ${process.env.PORT}`);
});
