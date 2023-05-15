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

const generateToken = async (userID, username, password) => {
  const token = jwt.sign({ username: username, userID: userID }, JWT_SECRET, {
    expiresIn: '1800s'
  })
  return token
}

const verifyToken = async token => {
  const res = await jwt.verify(token.split(' ')[1], JWT_SECRET)
  return { ...res, success: true }
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
    verifyToken, 
    generateToken, 
    generateHash, 
    verifyHash,
    saltRounds 
}
