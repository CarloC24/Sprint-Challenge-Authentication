const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  const creds = req.body;

  if (creds.username && creds.password) {
    const hash = bcrypt.hashSync(creds.password, 3);
    creds.password = hash;
    try {
      const response = await db('users').insert(creds);
      res.status(201).json({ message: `User created with id of ${response}` });
    } catch (err) {
      res.status(500).json({ message: 'Bad Request' });
    }
  } else {
    res
      .status(500)
      .json({ message: 'Fields : "username" && "password" cannot be empty' });
  }
}

async function login(req, res) {
  // implement user login
  const { username, password } = req.body;
  if (creds.username && creds.body) {
    try {
      const response = await db('users')
        .where({ username: username })
        .first();
    } catch (err) {}
  } else {
    res
      .status(500)
      .json({ message: 'Fields : "username" && "password" cannot be empty' });
  }
}

function getJokes(req, res) {
  axios
    .get('https://safe-falls-22549.herokuapp.com/random_ten')
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
