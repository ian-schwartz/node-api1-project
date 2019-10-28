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
      .catch(() => res.status(500).json({ error: "The users information could not be retrieved." }));
});

// GET to /api/users/:id
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
      .then(user => {
          if (!user) {
              res.status(404).json({ message: "The user with the specified ID does not exist." });
          } else {
              res.status(200).json(user);
          }
      })
      .catch(() => res.status(500).json({ error: "The users information could not be retrieved." }));
});


// POST to /api/users
server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db.insert(req.body)
          .then(user => {
            res.status(201).json(user);
          })
          .catch(() => res.status(500).json({ error: "There was an error while saving the user to the database" }));
        }
});

// DELETE to /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
      .then(deletedUsers => {
        if (deletedUsers > 0) {
          res.status(200).json({ message: `${deletedUsers} users have been deleted.` });
        } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(() => res.status(500).json({ error: "The user could not be removed." }));
});

// PUT to /api/users/:id
server.put('/api/users/:id', (req, res) => {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db.update(req.params.id, req.body).then(user => {
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
          }
        })
        .catch(() => res.status(500).json({ error: "The user information could not be modified." }));
    }
});


const port = 8000;
server.listen(port, () => console.log(`\n=== API on port ${port} ===\n`));