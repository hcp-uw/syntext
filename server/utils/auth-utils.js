const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = require('./config')

const saltRounds = 3

const generateHash = async (password) => {
    const res = await bcrypt.hash(password, saltRounds)
    return res;
}

const verifyHash = async (password, hash) => {
    const authResult = await bcrypt.compare(password, hash);
    return authResult
}

const generateRefreshToken = async (userSecret) => {
  const date = Date.now()

  const token = jwt.sign({ stamp: date }, userSecret, {
    expiresIn: '1800000000000s'
  })
  return token;
}

const verifyRefreshToken = async (userSecret, token) => {
  const res = await jwt.verify(token.split(' '[1], userSecret));
  return {...res, success: true}
}

const generateAccessToken = async (userID) => {
  const token = jwt.sign({ userID: userID }, JWT_SECRET, {
    expiresIn: '10s'
  })
  return token
}

const verifyAccessToken = async (token, userID) => {
  try {
    console.log(userID, token)
    const res = await jwt.verify(token.split(' ')[1], JWT_SECRET);
    if (!res) return { success: false }
    return { ...res, success: userID === res.userID }
  } catch (error) {
    console.error(error)
    return {...error, success: false}
  }
}

const refresh = (refreshToken, userID) => {
  
}

const extractToken = req => {
  if (
    req.method === 'POST' &&
    req.body !== undefined &&
    req.body.headers !== undefined &&
    req.body.headers.Authorization !== undefined
  ) {
    return req.body.headers.Authorization
  }

  const tokenIndex =
    req.rawHeaders.findIndex(header => header === 'Authorization') + 1

  return req.rawHeaders[tokenIndex]
}

module.exports = { 
    extractToken, 
    verifyAccessToken, 
    generateAccessToken, 
    generateRefreshToken,
    verifyRefreshToken,
    generateHash, 
    verifyHash,
    saltRounds 
}
