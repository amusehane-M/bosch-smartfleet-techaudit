const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. POST /api/register
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'inspector';

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, userRole]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: result.insertId, name, email, role: userRole }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error during registration.' });
  }
});

// 2. GET /api/vehicles
app.get('/api/vehicles', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT v.id, v.registration_no, v.vin, v.make, v.model, v.year, c.company_name AS customer_name
      FROM vehicles v
      LEFT JOIN customers c ON v.customer_id = c.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error retrieving vehicles.' });
  }
});

// 3. POST /api/vehicles (Register New Vehicle)
app.post('/api/vehicles', async (req, res) => {
  const { registration_no, vin, make, model, year, customer_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO vehicles (registration_no, vin, make, model, year, customer_id) VALUES (?, ?, ?, ?, ?, ?)',
      [registration_no, vin, make, model, year, customer_id || 1]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error registering vehicle.' });
  }
});

// 4. GET /api/bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT b.*, v.registration_no, v.make, v.model, u.name AS inspector_name
      FROM bookings b
      LEFT JOIN vehicles v ON b.vehicle_id = v.id
      LEFT JOIN users u ON b.inspector_id = u.id
      ORDER BY b.id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error retrieving bookings.' });
  }
});

// 5. POST /api/bookings (Create New Booking)
app.post('/api/bookings', async (req, res) => {
  const { vehicle_id, booking_date, inspection_type, status, inspector_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO bookings (vehicle_id, booking_date, inspection_type, status, inspector_id) VALUES (?, ?, ?, ?, ?)',
      [vehicle_id, booking_date, inspection_type || 'Periodic Safety & Brake Audit', status || 'PENDING', inspector_id || 1]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error creating booking.' });
  }
});

// 6. GET /api/certificates
app.get('/api/certificates', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, v.registration_no AS regNo, v.make, v.model, u.name AS inspectorName
      FROM certificates c
      LEFT JOIN vehicles v ON c.vehicle_id = v.id
      LEFT JOIN users u ON c.inspector_id = u.id
      ORDER BY c.id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error retrieving certificates.' });
  }
});

// 7. POST /api/certificates (Create Certificate)
app.post('/api/certificates', async (req, res) => {
  const { certNo, vehicle_id, inspector_id, outcome, inspectDate, nextDueDate } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO certificates (certificate_no, vehicle_id, inspector_id, outcome, issue_date, expiry_date) VALUES (?, ?, ?, ?, ?, ?)',
      [certNo, vehicle_id, inspector_id || 1, outcome || 'PASS', inspectDate, nextDueDate]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error saving certificate.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SmartFleet Backend running on port ${PORT}`);
});