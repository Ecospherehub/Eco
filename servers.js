const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const app = express();
const PORT = 2468;
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecospherehub'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'time.html'));
});
// ... (all other existing routes from the first file)

// GET endpoint to fetch ongoing programs
app.get('/api/programs', (req, res) => {
  const sql = 'SELECT * FROM programs';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching ongoing programs:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});

// POST endpoint to start a new program
app.post('/api/start-program', upload.single('image'), (req, res) => {
  const { programName, organizingDate, venue, details } = req.body;
  const image = req.file ? req.file.path : ''; // Assuming the image path is stored in req.file.path
  const sql = 'INSERT INTO programs (name, organizing_date, venue, details, image) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [programName, organizingDate, venue, details, image], (err, result) => {
    if (err) {
      console.error('Error starting program:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('New program started:', result);
      res.sendStatus(200);
    }
  });
});

// ... (all other existing routes and functionality from both files)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




// Endpoint to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'time.html'));
});
app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'contact.html'));
});
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'styles.css'));
});
app.get('/index.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.css'));
})
app.get('/register.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'register.css'));
})
app.get('/service.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'service.html'));
})
app.get('/vision.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'vision.html'));
})
app.get('/logo1.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'logo1.jpg'));
})
app.get('/carbon.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'carbon.html'));
})
app.get('/rule.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'rule.html'));
})
app.get('/games.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'games.html'));
})
app.get('/puzzle.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'puzzle.html'));
})
app.get('/community.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'community.html'));
})
app.get('/awareness.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'awareness.html'));
})

app.get('/puzzle.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'puzzle.css'));
})
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'login.html'));
})
app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'script.js'));
})
app.get('/green.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'green.html'));
})
app.get('/green.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'green.css'));
})
app.get('/green.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'green.js'));
})
app.get('/profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'profile.html'));
})
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'style.css'));
})
app.get('/scripts.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'scripts.js'));
})
app.get('/diy-projects.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'diy-projects.html'));
})
app.get('/map.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'map.html'));
})
app.get('/mapsopen.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'mapsopen.html'));
})
app.get('/challenges.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'challenges.html'));
})
app.get('/challenges.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'challenges.css'));
})
app.get('/eco.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'eco.html'));
})
app.get('/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'data.json'));
})
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'register.html'));
})
app.get('/forum.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forum.css'));
})
app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'about.html'));
})
app.get('/quiz.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'quiz.html'));
})
app.get('/forum.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forum.html'));
});

app.get('/about1.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'about1.html'));
})
app.get('/gallery.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'gallery.html'));
})
app.get('/guessing.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'guessing.html'));
})
app.get('/tours.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'tours.html'));
})



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


app.post('/quiz', (req, res) => {
  const { date, score, difficulty } = req.body;
  connection.query('INSERT INTO quiz_records (date, score, difficulty) VALUES (?, ?, ?)', [date, score, difficulty], (err, results) => {
    if (err) {
      console.error('Error storing quiz record:', err);
      return res.status(500).send('Error storing quiz record');
    }
    res.status(200).send('Quiz record stored successfully');
  });
});
app.get('/quiz', (req, res) => {
  connection.query('SELECT * FROM quiz_records ORDER BY date DESC LIMIT 5', (err, results) => {
    if (err) {
      console.error('Error fetching quiz records:', err);
      return res.status(500).send('Error fetching quiz records');
    }
    res.json(results);
  });
});
