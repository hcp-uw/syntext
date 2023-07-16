const userRouter = require('express').Router()
const bodyParser = require('body-parser')
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  extractToken,
  generateHash,
  handleAuth,
  saltRounds
} = require('../utils/auth')

const {
  createUser,
  isUser,
  deleteUser,
  authenticate,
  updateLastLogin,
  getUser,
  getUserID,
  updateUser,
  getRefreshToken,
  getSecret
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
    const hash = await generateHash(password)
    const result = await createUser(username, hash)
    const userID = await getUserID(username)
    
    if (!result.success) 
      return res.status(409).send({ success: false, error: result.error })
    
    const accessToken = await generateAccessToken(userID)
    
    const refreshToken = await generateRefreshToken()
    
    await updateUser(userID.result, 'secret', accessToken)
    await updateUser(userID.result, 'refresh_token', refreshToken)
    
    return res
      .set('Authorization', `Bearer ${accessToken}`)
      .status(201)
      .send({ success: true, userID: userID })
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
    if (!authorized.success) {
      res
        .status(401)
        .send({ success: false, error: 'Invalid username or password' })
    } else {
      const userID = await getUserID(username)
      const token = await generateAccessToken(userID)
      await updateUser(userID, 'secret', token)
      await updateLastLogin(userID)
      return res
        .set('Authorization', `Bearer ${token}`)
        .status(200)
        .json({ success: true, userID: userID })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

userRouter.post('/refresh', jsonParser, async (req, res) => {
  const { userID } = req.query
  const oldAccessToken = extractToken(req)
  const secret = await getSecret(userID)
  if (oldAccessToken !== 'Bearer ' + secret)
    return res
      .status(401)
      .send({ success: false, error: 'invalid access token' })

  const refreshToken = await getRefreshToken(userID)
  const refreshValidity = await verifyRefreshToken(
    userID,
    'Bearer ' + refreshToken
  )
  if (!refreshValidity) return { success: false }
  if (
    !refreshValidity.success &&
    refreshValidity.error.name === 'TokenExpiredError'
  )
    return res.status(401).send({ success: false, error: 'session expired' })

  const newAccessToken = await generateAccessToken(userID)
  await updateUser(userID, 'secret', newAccessToken)
  return res
    .status(200)
    .set('Authorization', `Bearer ${newAccessToken}`)
    .send({ success: true })
})

/*
    verify JWT token in authorization header.
    find user in database based on decoded token.
    send user data in response if successful,
    or send error message if request fails or token is invalid.
  */
userRouter.get('/account', handleAuth, async (req, res) => {
  const { userID } = req.query
  try {
    const result = await getUser(userID)
    return Number(result.user.userID) === Number(req.decodedUserID)
      ? res.status(200).send({ ...result.user, success: true })
      : res
          .status(401)
          .send({
            success: false,
            error: 'invalid userID or token'
          })
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
userRouter.put('/account', handleAuth, async (req, res) => {
  const { userID, key, value } = req.body
  try {
    switch (key) {
      case 'password':
        await handlePasswordChange(userID, value)
        break
      case 'username':
        await handleUsernameChange(userID, value)
        break
      case 'private':
        await handleAccountPrivateChange(userID, value)
        break
      default:
        await handleUnknownUpdate(userID, key, value)
        break
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
userRouter.delete('/account', [jsonParser, handleAuth], async (req, res) => {
  const { username, password, userID } = req.body // takes userID for handleAuth
  try {
    const result = await deleteUser(username, password)
    if (result.success) return res.status(200).send({ success: true })
    else return res.status(401).send({ success: false })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

userRouter.get('/id', jsonParser, async (req, res) => {
  const { username } = req.query
  try {
    const id = await getUserID(username)
    if (id.error) return res.status(400).send({ success: false })
    else return res.status(200).send({ success: true, userID: id })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'internal server error' })
  }
})

const handlePasswordChange = async (userID, newPassword) => {
  const newHash = await generateHash(value)
  const result = await updateUser(userID, 'hash_password', newHash)
  if (!result.success)
    return res
      .status(400)
      .send({ success: false, error: 'error while changing password' })
  if (result.success) return res.status(201).send({ success: true })
}

const handleUsernameChange = async (userID, newUsername) => {
  const existingID = await getUserID(newUsername)
  if (typeof Number(existingID) === 'number')
    return res
      .status(409)
      .send({ success: false, error: 'username already taken' })
  const result = await updateUser(userID, 'username', newUsername)
  if (!result.success)
    return res
      .status(400)
      .send({ success: false, error: 'error while changing username' })
  if (result.success) return res.status(201).send({ success: true })
}

const handleAccountPrivateChange = async (userID, isPrivate) => {
  const result = await updateUser(userID, 'private', isPrivate)
  if (!result.success)
    return res
      .status(400)
      .send({ success: false, error: 'error while changing username' })
  if (result.success) return res.status(201).send({ success: true })
}

const handleUnknownUpdate = async (userID, key, value) => {
  res
    .status(400)
    .send({ success: false, error: `unknown update ${key} ${value}` })
}

module.exports = {
  userRouter
}
