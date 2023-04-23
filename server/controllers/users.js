const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { JWT_SECRET } = require('../utils/config');
const { createUser, deleteUser } = require('../db/user-db');
const jsonParser = bodyParser.json();


const saltRounds = 3;

const generateToken = (username) => {
  const token = jwt.sign({ id: username }, JWT_SECRET);
  return token;
}

// create new user
userRouter.post('/create', jsonParser, async (req, res) => {
  const { username, password } = req.body;
   
  const hash = await bcrypt.hash(password, saltRounds);
  try {
    const result = await createUser(username, hash);
    const token = generateToken(username);
    res.set('Authorization', `Bearer ${token}`)
      .status(200)
      .json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }


  /*
    salt: 22
    hash: 31

    retrieve username and password from request body.
    hash password using bcrypt and save new user to database.
    create JWT token and send it back in response if successful,
    or send error message if request fails.
  */
});

// authenticate user and generate JWT token
userRouter.post('/login', (req, res) => {
  /*
    retrieve username and password from request body.
    verify user exists in database and check password with bcrypt.
    create JWT token and send it back in response if successful,
    or send error message if request fails.
  */
});

// get current user's data
userRouter.get('/me', (req, res) => {
  /*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    send user data in response if successful,
    or send error message if request fails or token is invalid.
  */
});

// update current user's data
userRouter.put('/me', (req, res) => {
  /*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    update user data and save to database.
    send updated user object in response if successful,
    or send error message if request fails or token is invalid.
  */
});

// delete current user's account
userRouter.delete('/me', (req, res) => {
  /*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    delete user from database.
    send success message in response if successful,
    or send error message if request fails or token is invalid.
  */
});


module.exports = {
  userRouter,
  saltRounds,
  generateToken,
};
