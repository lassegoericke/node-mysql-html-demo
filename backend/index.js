const express = require('express');
const pool = require('./db');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/users', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users');
  res.json(rows);
});

app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  const [result] = await pool.query('INSERT INTO users (name) VALUES (?)', [name]);
  res.json({ id: result.insertId, name });
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
  res.json({ deleted: id });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
