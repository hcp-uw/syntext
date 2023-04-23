const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { JWT_SECRET } = require('../utils/config')
const { createUser, deleteUser, authenticate, updateLastsLogin } = require('../db/user-db')
const jsonParser = bodyParser.json()

const saltRounds = 3

const generateToken = (username, password) => {
  const token = jwt.sign({ username: username, password: password }, JWT_SECRET, {
    expiresIn: '1800s'
  })
  return token
}

/*
  retrieve username and password from request body.
  hash password using bcrypt and save new user to database.
  create JWT token and send it back in response if successful,
  or send error message if request fails.
*/
userRouter.post('/create', jsonParser, async (req, res) => {
  const { username, password } = req.body

  const hash = await bcrypt.hash(password, saltRounds)
  try {
    const result = await createUser(username, hash)
    const token = generateToken(username, password)
    res.set('Authorization', `Bearer ${token}`).status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

/*
  retrieve username and password from request body.
  verify user exists in database and check password with bcrypt.
  create JWT token and send it back in response if successful,
  or send error message if request fails.
*/
userRouter.post('/login', jsonParser, async (req, res) => {
  const { username, password } = req.body
  try {
    const authorized = await authenticate(username, password)
    if (!authorized.success) res.status(401).send(authorized)
    else {
      const token = generateToken(username, password)
      res.set('Authorization', `Bearer ${token}`).status(200).json(authorized)
      updateLastLogin(username)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

  /*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    send user data in response if successful,
    or send error message if request fails or token is invalid.
  */
userRouter.get('/account', async (req, res) => {
  try {
    const token = req.rawHeaders[3]
    if (!token) res.status(500).send({success: false});
    else {
      const decoded = await jwt.verify(token.split(' ')[1], JWT_SECRET);
      //const result = await deleteUser(decoded.username, decoded.password);
      const result = await returnUserData
      const statusCode = result.success ? 204 : 401;
      res.status(statusCode);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

  /*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    update user data and save to database.
    send updated user object in response if successful,
    or send error message if request fails or token is invalid.
  */
userRouter.put('/account', async (req, res) => {
  const { newUsername, newPassword } = req.body

  try {
    const token = req.rawHeaders[3]
    if (!token) res.status(500).send({success: false});
    else {
      const decoded = await jwt.verify(token.split(' ')[1], JWT_SECRET);
      const result = await updateUser(decoded.username, newUsername, await bcrypt.hash(newPassword, saltRounds));
      const statusCode = result.success ? 204 : 401;
      res.status(statusCode);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

/*
  verify JWT token in authorization header.
  find user in database based on decoded token.
  delete user from database.
  send success message in response if successful,
  or send error message if request fails or token is invalid.
*/
userRouter.delete('/account', jsonParser, async (req, res) => {
  try {
    const token = req.rawHeaders[3]
    if (!token) res.status(500).send({success: false});
    else {
      const decoded = await jwt.verify(token.split(' ')[1], JWT_SECRET);
      const result = await deleteUser(decoded.username, decoded.password);
      const statusCode = result.success ? 204 : 401;
      res.status(statusCode);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

module.exports = {
  userRouter,
  saltRounds,
  generateToken
}
