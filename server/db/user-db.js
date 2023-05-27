const mysql = require('mysql2')
const config = require('../utils/config.js')
const { pool } = require('./pool.js')
const { verifyHash, generateRefreshToken } = require('../utils/auth.js')

const getRefreshToken = async userID => {
  if (!userID) return { success: false, error: 'missing required field' }
  let connection
  try {
    connection = await pool.getConnection()
    const query = 'SELECT refresh_token FROM users WHERE userID = ?'
    const result = await connection.query(query, [userID])
    const rows = result[0]

    if (rows.length > 0) {
      return rows[0].refresh_token
    } else {
      return { success: false, error: `User ${userID} not found` }
    }
  } catch (error) {
    console.error(error)
    return error
  } finally {
    await connection.release()
  }
}

const getSecret = async userID => {
  if (!userID) return { success: false, error: 'missing required field' }
  let connection
  try {
    connection = await pool.getConnection()
    const query = 'SELECT secret FROM users WHERE userID = ?'
    const result = await connection.query(query, [userID])

    const rows = result[0]

    if (rows.length > 0) {
      return rows[0].secret
    } else {
      return { success: false, error: `User ${userID} not found` }
    }
  } catch (error) {
    console.error(error)

    return error
  } finally {
    await connection.release()
  }
}

const isUser = async userID => {
  if (!userID) return { success: false, error: 'missing required field' }
  let connection
  try {
    connection = await pool.getConnection()
    const query = 'SELECT username FROM users WHERE userID = ?'
    const result = await connection.query(query, [userID])
    const rows = result[0]

    return rows.length > 0
  } catch (error) {
    console.error(error)

    return error
  } finally {
    await connection.release()
  }
}

const getUser = async userID => {
  if (!userID) return { success: false, error: 'missing required field' }
  let connection
  try {
    connection = await pool.getConnection()
    const query =
      'SELECT username, userID, last_login FROM users WHERE userID = ?'
    const result = await connection.query(query, [userID])
    const rows = result[0]

    if (rows.length > 0) {
      return rows[0]
    } else {
      return { success: false, error: `User ${userID} not found` }
    }
  } catch (error) {
    console.error(error)

    return error
  } finally {
    await connection.release()
  }
}

// The key must be sanitized!!! only ever hard code string values (never use client input)
const updateUser = async (userID, key, value) => {
  if (!userID || !key || !value)
    return { success: false, error: 'missing required field' }
  let connection
  try {
    const exists = await isUser(userID)
    if (!exists) return { success: false, error: `User not found` }
    connection = await pool.getConnection()
    const query = `
        UPDATE users
        SET ${key} = ?    
        WHERE userID = ?;`
    const result = await connection.query(query, [value, userID])
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, ...error }
  } finally {
    await connection.release()
  }
}

const getUserID = async username => {
  if (!username) return { success: false, error: 'missing required field' }
  let connection
  try {
    connection = await pool.getConnection()
    const query = 'SELECT userID FROM users WHERE username = ?'
    const result = await connection.query(query, [username])
    const rows = result[0]
    if (rows.length > 0) {
      return rows[0].userID
    } else {
      return { success: false, error: `User ${username} not found` }
    }
  } catch (error) {
    console.error(error)
    return error
  } finally {
    await connection.release()
  }
}

const createUser = async (username, hash) => {
  if (!username || !hash)
    return { success: false, error: 'missing required field' }
  let connection
  try {
    connection = await pool.getConnection()
    // Check if username exists in table
    const query = 'SELECT username FROM users WHERE username = ?'
    const result = await connection.query(query, [username])
    //checks if any rows were returned
    if (result[0].length > 0) {
      await connection.release()
      return { success: false, error: `User ${username} already exists` }
    } else {
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
      const result = await pool.query(insert, [username, hash])
      return {
        success: true,
        created: username
      }
    }
  } catch (error) {
    console.error(error)
    return { ...error, success: false }
  } finally {
    await connection.release()
  }
}

const authenticate = async (username, password) => {
  if (!username || !password)
    return { success: false, error: 'missing required field' }
  let connection
  try {
    connection = await pool.getConnection()
    // Check if username exists in table
    const query = 'SELECT username, hash_password FROM users WHERE username = ?'
    const result = await connection.query(query, [username])

    //checks if any rows were returned
    if (result[0].length === 0) {
      return { success: false, error: `User ${username} doesn't exist` }
    } else {
      const user = result[0][0]
      const savedHash = user.hash_password
      const authResult = await verifyHash(password, savedHash)
      return { success: authResult }
    }
  } catch (error) {
    console.error(error)
    return error
  } finally {
    await connection.release()
  }
}

const updateLastLogin = async userID => {
  if (!userID) return { success: false, error: 'missing required field' }
  let connection
  try {
    connection = await pool.getConnection()
    const insert = 'UPDATE users SET last_login= NOW() where userID = ?'
    const result = await connection.query(insert, [userID])
    return { success: true }
  } catch (error) {
    console.error(error)
    return { ...error, success: false }
  } finally {
    await connection.release()
  }
}

const deleteUser = async (username, password) => {
  if (!username || !password)
    return { success: false, error: 'missing required field' }
  let connection
  try {
    connection = await pool.getConnection()
    const isAuthorized = await authenticate(username, password)
    if (!isAuthorized.success) return { ...isAuthorized, success: false }
    const id = await getUserID(username)
    const deleteSettings = 'DELETE FROM settings AS s WHERE s.userID=?;'
    const deleteGames = 'DELETE FROM games AS g WHERE g.userID=?;'
    const deleteUser = 'DELETE FROM users AS u WHERE u.userID=?;'
    q = [deleteSettings, deleteGames, deleteUser]
    await connection.beginTransaction()
    await connection.query(q[0], id)
    await connection.query(q[1], id)
    await connection.query(q[2], id)
    await connection.commit()
    return { success: true, deleted: username }
  } catch (error) {
    console.error(error)
    connection.rollback()
    return { ...error, success: false }
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
