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

const generateRefreshToken = async () => {
  const date = Date.now()
  const token = jwt.sign({ stamp: date }, JWT_SECRET, {
    expiresIn: '1800000000000s',
  })
  return token;
}

const verifyRefreshToken = async (userSecret, token) => {
  console.log("input: ", userSecret, token)
  try {
    const res = await jwt.verify(token.split(' ')[1], JWT_SECRET);
    return {...res, success: true}  
  } catch (error) {
    if (error.name == 'TokenExpiredError') {
      return {error: error, success: false}
    } else {
      return {error: error, success: false}
    }
  }
  
}

const generateAccessToken = async (userID) => {
  const token = jwt.sign({ userID: userID }, JWT_SECRET, {
    expiresIn: '150s'
  })
  return token
}

const verifyAccessToken = async (token, userID) => {
  try {
    const res = await jwt.verify(token.split(' ')[1], JWT_SECRET)
    return { ...res, success: true }
  } catch (error) {
    if (error.name == 'TokenExpiredError') {
      return {error: error, success: false}
    }
  }
}

const extractToken = req => {
  if (req.headers && req.headers.Authorization) return req.headers.Authorization
  if (req.headers && req.headers.authorization) return req.headers.authorization 
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


const extractUserID = req => {
  let userID;
  if (req.query)
     userID = req.query.userID;
  if (userID === undefined) 
    userID = req.body.userID;
  return userID;
}

const handleAuth = async (req, res, next) => {
  const userID = extractUserID(req);
  const token = extractToken(req);
  try {
    if (!token) {
      return res.status(401).send({ success: false });
    }
    //console.log("hi from auth", token)
    const decoded = await verifyAccessToken(token, userID);

    if (!decoded || Number(decoded.userID) !== Number(userID)) {
      return res.status(401).send({ success: false, error: "TokenExpired" });
    }

    req.decodedUserID = decoded.userID; // store  decoded userID in req 
    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { 
    extractToken, 
    verifyAccessToken, 
    generateAccessToken, 
    generateRefreshToken,
    verifyRefreshToken,
    generateHash, 
    verifyHash,
    handleAuth,
    saltRounds 
}
