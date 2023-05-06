const mysql = require('mysql2')
const config = require('../utils/config.js')
const bcrypt = require('bcrypt')
const { pool } = require('./pool.js')

//id int primary key auto_increment,
//     username varchar(256) references users(username),
//     snippet_id int,
//     total_time int,
//     total_characters int,
//     wpm_data text,
//     wpm_avg float,
//     accuracy float,
//     num_mistakes int,
//     time_stamp datetime,

const createGameEntry = async game => {
  const {
    userID,
    snippet_id,
    total_time,
    total_characters,
    wpm_data,
    wpm_avg,
    accuracy,
    num_mistakes
  } = game
  try {
    const connection = await pool.getConnection()
    const query = `
      INSERT INTO games ( 
        id, userID, snippet_id, 
        total_time, total_characters, 
        wpm_data, wpm_avg, accuracy, 
        num_mistakes, time_stamp 
      ) 
      VALUES ( NULL,?,?,?,?,?,?,?,?, NOW() );
    `
    const result = await connection.query(query, [
      userID,
      snippet_id,
      total_time,
      total_characters,
      wpm_data,
      wpm_avg,
      accuracy,
      num_mistakes
    ])
    await connection.release();
    return { success: true };
  } catch (error) {
    console.error(error)
    return { success: false, error: error };
  }
}

const getGameEntry = async userID => {
  try {
    const connection = await pool.getConnection()
    const query = `
      SELECT * FROM games WHERE userID=?;
    `
    const result = await connection.query(query, [userID]);
    await connection.release();
    return result;
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}

const clearGameEntries = async userID => {
  try {
    const connection = pool.getConnection();
    const query = `
      DELETE FROM games as g WHERE g.userID=?;
    `
    const result = await connection.query(query, [userID]);
    await connection.release();
    return { success: true, result: result }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  }
}
//Add in function that returns aggergate stats for leaderboard (JOINT for users.id & games.userID)\
//Sub-query on user stats -> pull average stats and return stats ranked (WPM)

module.exports = { createGameEntry, getGameEntry, clearGameEntries }
