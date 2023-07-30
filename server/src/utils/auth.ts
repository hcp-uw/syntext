import jwt, { JsonWebTokenError, JwtHeader, JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET }  from './config'
import { NextFunction, Request } from 'express'
import { Response } from 'express-serve-static-core'
import { SuccesfullyDecodedToken, FailedDecodedToken, IdentifiedRequest, Result } from '../types'

const saltRounds = 3

interface AccessTokenPayload extends JwtPayload {
  userID: number
}

interface RefreshTokenPayload extends JwtPayload {
  stamp: number
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
  Result<boolean> => {
  try {
    const res: any = jwt.verify(token.split(' ')[1], JWT_SECRET)

    if (typeof res === "string")
      return { success: false, error: "decoded token is a string instead of a JwtPayload" }

    return { result: Number(res.userID) === Number(userID), success: true }
  } catch (error) {
    return { error: error, success: false }
  }
}

export const verifyRefreshToken = async (userSecret: string, token: string): 
  Result<boolean> => {
  try {
    const res: any = jwt.verify(token.split(' ')[1], JWT_SECRET)

    if (!res)
      return { success: false, error: 'jwt payload undefined' }

    return { result: true, success: true }
  } catch (error: unknown) {
    return { error: error, success: false }
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


export const extractToken = (req: Request): string | undefined => {
  if (req.headers && req.headers.authorization) 
    return req.headers.authorization
  else 
    return undefined
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



export const handleAuth = async (req: IdentifiedRequest, res: Response, next: NextFunction) => {
  const userID = extractUserID(req)
  const token = extractToken(req)
  //=============================================
  // console.log('in handleAuth', userID, token)
  //=============================================
  if (userID === undefined)
    return res
      .status(401)
      .send({ success: false, error: 'missing userID' })
  
  if (!token) 
    return res
      .status(401)
      .send({ success: false, error: 'missing token' })
  
  try {

    let { success, result, error } = await verifyAccessToken(token, userID)
    
    if (!success || !result)
      return res
        .status(401)
        .send({ success: false, error: error })

    
    req.decodedUserID = userID // store  decoded userID in req

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}
