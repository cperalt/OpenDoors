const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const app = express();

// Connect to MySQL database
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }
//   console.log('Connected to database.');
// });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
app.get('/api/some-endpoint', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
