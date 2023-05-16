const userRouter = require('express').Router()
const bodyParser = require('body-parser')
const { verifyToken, generateToken, extractToken, generateHash, saltRounds } = require('../utils/auth');

const {
  createUser,
  isUser,
  deleteUser,
  authenticate,
  updateLastLogin,
  getUser,
  getUserID,
  updateUser
} = require('../db/user-db')
const jsonParser = bodyParser.json()



/*
  retrieve username and password from request body.
  hash password using bcrypt and save new user to database.
  create JWT token and send it back in response if successful,
  or send error message if request fails.
*/
userRouter.post('/create', jsonParser, async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .send({ success: false, error: 'Missing required fields' })
  }

  try {
    const hash = await generateHash(password);
    const result = await createUser(username, hash)
    const userID = await getUserID(username);
    if (!result.success) return res.status(409).send({...result}) 
    const token = await generateToken(userID, username, password)
    return res
      .set('Authorization', `Bearer ${token}`)
      .status(201)
      .send({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, ...error })
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

  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required fields' })

  try {
    const authorized = await authenticate(username, password)
    if (!authorized.success){
      res
        .status(401)
        .send({ success: false, error: 'Invalid username or password' })
    }else {
      const userID = await getUserID(username);
      const token = await generateToken(userID, username, password)
      res
        .set('Authorization', `Bearer ${token}`)
        .status(200)
        .json({ success: true })
      await updateLastLogin(username)
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
  const token = extractToken(req)
  
  try {
    if (!token) res.status(500).send({ success: false })
    else {
      const decoded = await verifyToken(token);
      const result = await getUser(decoded.username)
      if (result.username && decoded.username)
        res.status(200).send({ ...result, success: true })
      else res.status(401).send({ success: false })
      return
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

/*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    update user data and save to database. send 
    error message if request fails or token is invalid.
  */
userRouter.put('/account', async (req, res) => {
  const { userID, key, value } = req.body
  const token = extractToken(req)
  if (!token) return res.status(500).send({ success: false })
  try {
    const decoded = verifyToken(token)
    if (!decoded.success) return res.status(401).send({success: false, error: 'unauthorized'})
    
    switch (key) {
      case "password":
        await handlePasswordChange(userID, value)
        break;
      case "username":
        await handleUsernameChange(userID, value)
        break;
      case "private":
        await handleAccountPrivateChange(userID, value)
        break;
      default: 
        await handleUnknownUpdate(userID, key, value);
        break;
    }
    


  } catch (error) {
    console.error(error)
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
  const { username, password } = req.body;
  const token = extractToken(req)
  try {
    if (!token) res.status(401).send({ success: false })
    else {
      const decoded = await verifyToken(token)
      const result = await deleteUser(username, password)
      if (result.success) 
        res.status(200).send({ success: true })
      else 
        res.status(401).send({ success: false })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

userRouter.get('/id', jsonParser, async (req, res) => {
  const { username } = req.body;
  try {
    const id = await getUserID(username);
    if (id.error) return res.status(400).send({success: false})
    else res.status(200).send({userID: id})
  } catch (error) {
    console.error(error);
    res.status(500).send({success: false, error: 'internal server error'})
  }
})


const handlePasswordChange = async (userID, newPassword) => {
  const newHash = await generateHash(value);
  const result = await updateUser(userID, "hash_password", newHash);
  if (!result.success) return res.status(400).send({success: false, error: "error while changing password"});
  if (result.success) return res.status(201).send({success: true});
}

const handleUsernameChange = async (userID, newUsername) => {
  const existingID = await getUserID(newUsername);
  if (typeof Number(existingID) === 'number') return res.status(409).send({success: false, error: "username already taken"});
  const result = await updateUser(userID, "username", newUsername);
  if (!result.success) return res.status(400).send({success: false, error: "error while changing username"});
  if (result.success) return res.status(201).send({success: true});
}

const handleAccountPrivateChange = async (userID, isPrivate) => {
  const result = await updateUser(userID, "private", isPrivate);
  if (!result.success) return res.status(400).send({success: false, error: "error while changing username"});
  if (result.success) return res.status(201).send({success: true});
}

const handleUnknownUpdate = async (userID, key, value) => {
  res.status(400).send({success: false, error: `unknown update ${key} ${value}`});
}



module.exports = {
  userRouter
}
