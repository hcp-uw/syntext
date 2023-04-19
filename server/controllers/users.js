const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// create new user
usersRouter.post('/create', (req, res) => {
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
usersRouter.post('/login', (req, res) => {
  /*
    retrieve username and password from request body.
    verify user exists in database and check password with bcrypt.
    create JWT token and send it back in response if successful,
    or send error message if request fails.
  */
});

// get current user's data
usersRouter.get('/me', (req, res) => {
  /*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    send user data in response if successful,
    or send error message if request fails or token is invalid.
  */
});

// update current user's data
usersRouter.put('/me', (req, res) => {
  /*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    update user data and save to database.
    send updated user object in response if successful,
    or send error message if request fails or token is invalid.
  */
});

// delete current user's account
usersRouter.delete('/me', (req, res) => {
  /*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    delete user from database.
    send success message in response if successful,
    or send error message if request fails or token is invalid.
  */
});

module.exports = usersRouter;
