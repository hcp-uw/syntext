const userRouter = require('express').Router()
import bodyParser, { raw } from 'body-parser'
import * as Auth from '../utils/auth'
import * as Users from '../db/user-db'
import { Request, Response } from 'express'
import { FailedDecodedToken, IdentifiedRequest } from './../types';
const jsonParser = bodyParser.json()

/*
  retrieve username and password from request body.
  hash password using bcrypt and save new user to database.
  create JWT token and send it back in response if successful,
  or send error message if request fails.
*/
userRouter.post('/create', jsonParser, async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .send({ success: false, error: 'Missing required fields' })
  }

  try {
    const hash = await Auth.generateHash(password)
    const createResult = await Users.createUser(username, hash)
    
    if (!createResult.success || !createResult.result) 
      return res.status(409).send({ success: false, error: createResult.error })
    
    const userID = createResult.result

    const accessToken = await Auth.generateAccessToken(userID)
    
    const refreshToken = await Auth.generateRefreshToken()
    
    await Users.updateUser(userID, 'secret', accessToken)
    await Users.updateUser(userID, 'refresh_token', refreshToken)
    
    return res
      .set('Authorization', `Bearer ${accessToken}`)
      .status(201)
      .send({ success: true, result: userID })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: error })
  }
})

/*
  retrieve username and password from request body.
  verify user exists in database and check password with bcrypt.
  create JWT token and send it back in response if successful,
  or send error message if request fails.
*/
userRouter.post('/login', jsonParser, async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required fields' })

  try {
    const authorized = await Users.authenticate(username, password)
    if (!authorized.success || !authorized.result) 
      return res
        .status(401)
        .send({ success: false, error: 'Invalid username or password' })
  
    const userID = await Users.getUserID(username)

    if (!userID.success || !userID.result)
      return res
        .status(404)
        .send({ success: false, error: 'Invalid username or password' })

    const token = await Auth.generateAccessToken(userID.result)

    await Users.updateUser(userID.result, 'secret', token)  // might want to verify 
    await Users.updateLastLogin(userID.result)              // this is successful

    return res
      .set('Authorization', `Bearer ${token}`)
      .status(200)
      .json({ success: true, result: userID })
  
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: 'Server error' })
  }
})

userRouter.post('/refresh', jsonParser, async (req: Request, res: Response) => {
  const { userID } = req.query
  if (typeof Number(userID) != 'number')
    return res
      .status(400)
      .json({ success: false, error: `invalid user id ${userID}` })
  
  const userIDv = Number(userID)
    
  const oldAccessToken = Auth.extractToken(req)
  const secret = await Users.getSecret(userIDv)

  if (!secret.success || !secret.result || oldAccessToken !== 'Bearer ' + secret.result)
    return res
      .status(401)
      .send({ success: false, error: 'invalid access token' })

  const refreshToken = await Users.getRefreshToken(userIDv)
  const refreshValidity = await Auth.verifyRefreshToken(
    secret.result,
    'Bearer ' + refreshToken
  )

  if (!refreshToken.success || !refreshToken.result)
    return res
      .status(401)
      .send({ success: false, error: 'invalid access token' })
  
  if (!refreshValidity.success || !refreshValidity.result)
    return res
      .status(401)
      .send({ success: false, error: 'session expired' })

  const newAccessToken = await Auth.generateAccessToken(userIDv)
  await Users.updateUser(userIDv, 'secret', newAccessToken)
  
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
userRouter.get('/account', Auth.handleAuth, async (req: IdentifiedRequest, res: Response) => {
  const { userID } = req.query
  if (typeof Number(userID) != 'number')
    return res
      .status(400)
      .json({ success: false, error: `invalid user id ${userID}` })
  
  const userIDv = Number(userID)

  
  try {
    const result = await Users.getUser(userIDv)
    if (!result.success || !result.result || result.result.userID !== req.decodedUserID)
      return res
        .status(401)
        .send({ success: false, error: 'invalid userID or token' })

    return res.status(200).send({ result: result.result, success: true })
      
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
userRouter.put('/account', Auth.handleAuth, async (req: IdentifiedRequest, res: Response) => {
  const { userID, key, value } = req.body
  try {
    switch (key) {
      case 'password':
        await handlePasswordChange(res, userID, value)
        break
      case 'username':
        await handleUsernameChange(res, userID, value)
        break
      case 'private':
        await handleAccountPrivateChange(res, userID, value)
        break
      default:
        await handleUnknownUpdate(res, userID, key, value)
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
userRouter.delete('/account', [jsonParser, Auth.handleAuth], async (req: Request, res: Response) => {
  const { username, password, userID } = req.body // takes userID for handleAuth
  
  try {
    const result = await Users.deleteUser(username, password)
    if (result.success) return res.status(200).send({ success: true })
    else return res.status(401).send({ success: false })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
})

userRouter.get('/id', jsonParser, async (req: Request, res: Response) => {
  const { username } = req.query

  if (typeof username !== 'string')
    return res
      .status(400)
      .json( { success: false, result: `username ${username} invalid` })

  try {
    const id = await Users.getUserID(username)
    if (id.error) return res.status(400).send({ success: false })
    else return res.status(200).send({ success: true, userID: id })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'internal server error' })
  }
})

const handlePasswordChange = async (res: Response, userID, newPassword) => {
  const newHash = await Auth.generateHash(value)
  const result = await Users.updateUser(userID, 'hash_password', newHash)
  if (!result.success)
    return res
      .status(400)
      .send({ success: false, error: 'error while changing password' })
  if (result.success) return res.status(201).send({ success: true })
}

const handleUsernameChange = async (res: Response, userID, newUsername) => {
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

const handleAccountPrivateChange = async (res: Response, userID, isPrivate) => {
  const result = await updateUser(userID, 'private', isPrivate)
  if (!result.success)
    return res
      .status(400)
      .send({ success: false, error: 'error while changing username' })
  if (result.success) return res.status(201).send({ success: true })
}

const handleUnknownUpdate = async (res: Response, userID, key, value) => {
  res
    .status(400)
    .send({ success: false, error: `unknown update ${key} ${value}` })
}

module.exports = {
  userRouter
}
