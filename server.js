const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change to your MySQL username
  password: '', // Change to your MySQL password
  database: 'ecospherehub' // Change to your database name
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Serve index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forum.html'));
});

// API endpoint to fetch all posts
app.get('/api/posts', (req, res) => {
  const query = 'SELECT * FROM posts ORDER BY created_at DESC';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

// API endpoint to create a new post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    res.status(400).json({ error: 'Please provide title, content, and author for the post.' });
    return;
  }

  const query = 'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)';
  connection.query(query, [title, content, author], (err, result) => {
    if (err) {
      console.error('Error creating post:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ id: result.insertId, title, content, author });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
