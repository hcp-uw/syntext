import jwt, { JsonWebTokenError, JwtHeader, JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET }  from './config'
import { NextFunction, Request } from 'express'
import { Response } from 'express-serve-static-core'

const saltRounds = 3

interface AccessTokenPayload extends JwtPayload {
  userID: number
}

interface RefreshTokenPayload extends JwtPayload {
  stamp: number
}

interface SuccesfullyDecodedToken<T> { 
  result: T,
  success: boolean 
} 

interface FailedDecodedToken { 
  error: unknown,
  success: boolean,
  message?: string 
}

export const generateHash = async (password: string): Promise<string> => {
  const res: string = await bcrypt.hash(password, saltRounds)
  return res
}

export const verifyHash = async (password: string, hash: string): Promise<boolean> => {
  const authResult: boolean = await bcrypt.compare(password, hash)
  return authResult
}

export const generateRefreshToken = async (): Promise<string> => {
  const date: number = Date.now()
  const token: string = jwt.sign({ stamp: date }, JWT_SECRET, {
    expiresIn: '864000s'
  })
  return token
}


export const generateAccessToken = async (userID: number | string): Promise<string> => {

  const token: string = jwt.sign({ userID: Number(userID) }, JWT_SECRET, {
    expiresIn: '7200s'
  })
  return token
}

/**
 * TODO:
 * 
 * CONSOLIDATE RETURN TYPES
 *    |     |     |     |
 *    V     V     V     V
 */

export const verifyAccessToken = async (token: string, userID: string | number):
  Promise<
    {result: AccessTokenPayload, success: boolean} | 
    {error: unknown, success: false, message?: string}
  > => {
  try {
    const res: string | JwtPayload = await jwt.verify(token.split(' ')[1], JWT_SECRET)

    if (typeof res === "string")
      return { error: undefined, success: false, message: "decoded token is a string instead of a JwtPayload" }

    return { result: res as AccessTokenPayload, success: true }
  } catch (error) {
    if (error instanceof JsonWebTokenError && error.name == 'TokenExpiredError') {
      return { error: error, success: false, message: "expired" }
    } else {
      return { error: error, success: false }
    }
  }
}

export const verifyRefreshToken = async (userSecret: string, token: string): 
  Promise<
    {result: string | JwtPayload, success: boolean} | 
    {error: unknown, success: false, message?: string}
  > => {
  try {
    const res: string | JwtPayload = jwt.verify(token.split(' ')[1], JWT_SECRET)

    return { result: res, success: true }
  } catch (error: unknown) {
    if (error instanceof JsonWebTokenError && error.name == 'TokenExpiredError') {
      return { error: error, success: false, message: "expired" }
    } else {
      return { error: error, success: false }
    }
  }
}


/**
 *    ^     ^     ^     ^ 
 *    |     |     |     |
 * 
 * TODO:
 * 
 * CONSOLIDATE RETURN TYPES
 */



/**
 * TODO:
 * 
 * Figure out a way to extract token consistently 
 *    |     |     |     |
 *    V     V     V     V
 */


export const extractToken = (req: Request): string => {
  // if (req.headers && req.headers.Authorization) return req.headers.Authorization
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


/**
 *    ^     ^     ^     ^ 
 *    |     |     |     |
 * 
 * TODO:
 * 
 * Figure out a way to extract token consistently 
 */



const extractUserID = (req: Request): number => {
  let userID
  if (req.query && req.query.userID) userID = req.query.userID
  if (userID === undefined && req.body && req.body.userID)
    userID = req.body.userID
  return userID
}

interface IdentifiedRequest extends Request {
  userID: number
  decodedUserID: number
}

export const handleAuth = async (req: IdentifiedRequest, res: Response, next: NextFunction) => {
  const userID = extractUserID(req)
  const token = extractToken(req)
  //=============================================
  console.log('in handleAuth', userID, token)
  //=============================================
  if (userID === undefined)
    return res.status(401).send({ success: false, error: 'missing userID' })
  try {
    if (!token) {
      return res.status(401).send({ success: false, error: 'missing token' })
    }

    let decoded: SuccesfullyDecodedToken<AccessTokenPayload> | FailedDecodedToken = await verifyAccessToken(token, userID)

    console.log(decoded)

    if (decoded && (!decoded.success)) {
      decoded = decoded as FailedDecodedToken
      return res.status(401).send({ success: false, error: decoded.message })
    }

    decoded = decoded as SuccesfullyDecodedToken<AccessTokenPayload>
    req.decodedUserID = decoded.result.userID // store  decoded userID in req

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}
