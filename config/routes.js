const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const generateToken = require('./generateToken');

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/users', getUsers);
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
  //implement user login
  const creds = req.body;
  try {
    const response = await db('users')
      .where({ username: creds.username })
      .first();
    if (response && bcrypt.compareSync(creds.password, response.password)) {
      const token = generateToken(response);
      res
        .status(200)
        .json({ Message: `Welcome ${response.username} to dad jokes`, token });
    } else {
      res.status(403).json({ message: 'Wrong password' });
    }
  } catch (err) {
    res.status(200).json({ message: 'no user found' });
  }
}

async function getUsers(req, res) {
  const response = await db('users');
  return res.status(200).json(response);
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
