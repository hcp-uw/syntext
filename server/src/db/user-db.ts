import mysql from 'mysql2'
import * as config  from '../utils/config'
import { pool } from './pool'
import { verifyHash, generateRefreshToken } from '../utils/auth'
import { User } from '../types'


type Result<T> = Promise<{
    success: boolean,
    result?: T,
    error?: unknown
}>


const getRefreshToken = async (userID: number): Result<number> => {
  
  let connection: any
  try {
    connection = await pool.getConnection()
    const query = 'SELECT refresh_token FROM users WHERE userID = ?'
    const result = await connection.query(query, [userID])
    const rows = result[0]

    if (rows.length > 0) {
      return { success: true, result: rows[0].refresh_token }
    } else {
      return { success: false, error: `User ${userID} not found` }
    }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

const getSecret = async (userID: number): Result<number> => {
  
  let connection: any
  try {
    connection = await pool.getConnection()

    const query = 'SELECT secret FROM users WHERE userID = ?'
    const result = await connection.query(query, [userID])
    const rows = result[0]

    if (rows.length > 0) 
      return { success: true, result: rows[0].secret }
    else 
      return { success: false, error: `User ${userID} not found` }
    
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

const isUser = async (userID: number): Result<boolean> => {
  
  let connection: any
  try {
    connection = await pool.getConnection()
    const query = 'SELECT username FROM users WHERE userID = ?'
    const result = await connection.query(query, [userID])
    const rows = result[0]

    return { success: true, result: rows.length > 0 }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

const getUser = async (userID: number): Result<User> => {

  let connection: any
  try {
    connection = await pool.getConnection()
    const query =
      'SELECT username, userID, last_login FROM users WHERE userID = ?'
    const result = await connection.query(query, [userID])
    const rows = result[0]

    if (rows.length > 0) 
      return { success: true, result: rows[0] }
    else 
      return { success: false, error: `User ${userID} not found` }
    
  } catch (error) {
    console.error(error)

    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

// The key must be sanitized!!! only ever hard code string values (never use client input)
const updateUser = async (userID: number, key: keyof User, value: string): Result<undefined> => {

  // if (value is not a proper value) 
  //   return { 
  //     success: false, 
  //     error: `invalid value ${String(value)} for key ${String(key)}`
  //   }
  

  let connection: any
  try {
    const exists = await isUser(userID)
    if (!exists.success || !exists.result) 
      return { success: false, error: `User not found` }

    connection = await pool.getConnection()
    const query = `
        UPDATE users
        SET ${String(key)} = ?    
        WHERE userID = ?;`
    const result = await connection.query(query, [value, userID])
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

const getUserID = async (username: string): Result<number> => {
  
  let connection: any
  try {
    connection = await pool.getConnection()
    const query = 'SELECT userID FROM users WHERE username = ?'
    const result = await connection.query(query, [username])
    const rows = result[0]

    if (rows.length > 0) 
      return { result: rows[0].userID, success: true }
    else 
      return { success: false, error: `User ${username} not found` }
    
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

const createUser = async (username: string, hash: string): Result<number> => {

  let connection: any
  try {
    connection = pool.getConnection()
    let res = await getUserID(username)

    if (res.success) 
      return { 
        success: false, 
        error: `User ${username} already exists` 
      }
    
    const insert = `
      INSERT INTO users (
          userID, 
          username, 
          hash_password, 
          date_created,
          refresh_token,
          secret,
          last_login
      ) VALUES (NULL, ?, ?, CURRENT_DATE, NULL, NULL, NULL);
    `
    await connection.query(insert, [username, hash])
    res = await getUserID(username)
    if (res.success)
      return {
        success: true,
        result: res.result 
      }
    else
      return {
        success: false,
        error: `error confirming userID generation: ${String(res.error)}`
      }
    
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

const authenticate = async (username: string, password: string): Result<boolean> => {
  
  let connection: any
  try {
    connection = await pool.getConnection()
    // Check if username exists in table
    const query = 'SELECT username, hash_password FROM users WHERE username = ?'
    const result = await connection.query(query, [username])
    const rows = result[0]

    //checks if any rows were returned
    if (rows.length > 0) {
      const authResult = await verifyHash(password, rows[0].hash_password)
      return { success: true, result: rows[0].hash_password }
    } else 
      return { 
        success: false, 
        error: `User ${username} doesn't exist` 
      }

  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

const updateLastLogin = async (userID: number): Result<undefined> => {
  
  let connection: any
  try {
    const date = Date.now()
    const res = await updateUser(userID, 'last_login', String(date))
    return res
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

const deleteUser = async (username: string, password: string): Result<undefined> => {
  
  let connection: any
  try {
    connection = await pool.getConnection()

    const authResult = await authenticate(username, password)
    
    if (!authResult.success || !authResult.result) 
      return { success: false, error: `unable to authenticate` }

    const idResult = await getUserID(username)

    if (!idResult.success || !idResult.result)
      return { success: false, error: idResult.error }

    const id: number = idResult.result
    const deleteSettings = 'DELETE FROM settings AS s WHERE s.userID=?;'
    const deleteGames = 'DELETE FROM games AS g WHERE g.userID=?;'
    const deleteUser = 'DELETE FROM users AS u WHERE u.userID=?;'

    const q = [deleteSettings, deleteGames, deleteUser]
    await connection.beginTransaction()
    await connection.query(q[0], id)
    await connection.query(q[1], id)
    await connection.query(q[2], id)

    const isStillUser = await isUser(id)
    if (!isStillUser.success || isStillUser.result)
      return { success: false, error: `error while verifying deletion` }

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release()
  }
}

module.exports = {
  createUser,
  deleteUser,
  getUserID,
  authenticate,
  updateLastLogin,
  getUser,
  isUser,
  updateUser,
  getRefreshToken,
  getSecret
}
