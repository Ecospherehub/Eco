const express = require('express');
const path = require('path');

const app = express();
const PORT = 2468;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dummy authentication middleware
const authenticateUser = (req, res, next) => {
    // Check if user is logged in (you can implement your authentication logic here)
    const isLoggedIn = req.query.loggedIn === 'true'; // Simulated check for demonstration
    if (isLoggedIn) {
        next();
    } else {
        res.redirect('/login.html'); // Redirect to login page if not logged in
    }
};

// Apply authentication middleware to restrict access to home page
app.use('/', authenticateUser);

// Endpoint for serving other HTML pages
app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'public', `${page}.html`));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
