// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

// GET to /api/users
server.get('/api/users', (req, res) => {
    db.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to get users from db' });
      });
  });

// POST to /api/users


const port = 8000;
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));