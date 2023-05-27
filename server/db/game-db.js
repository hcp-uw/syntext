const mysql = require('mysql2')
const config = require('../utils/config.js')
const bcrypt = require('bcrypt')
const { pool } = require('./pool.js')

const missingRequiredParams = (name, obj) => {
  return {success: false, error: `missing required params in ${name}: ${obj}`};
}

//id int primary key auto_increment,
//     userID varchar(256) references users(id),
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

  if (!(
    typeof userID == "number" &&
    typeof snippet_id == "number" &&
    typeof total_time == "number" &&
    typeof total_characters == "number" &&
    wpm_data &&
    typeof wpm_avg == "number" &&
    typeof accuracy == "number" &&
    typeof num_mistakes == "number"
    )) return missingRequiredParams("game", game);

  try {
    const connection = await pool.getConnection();
    
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
    
    return { success: true };
  } catch (error) {
    console.error(error)
    return { success: false, error: error };
  } finally {
    await connection.release();
  }
}

const getGameEntries = async userID => {

  try {
    if (!userID || isNaN(userID)) 
      return {success: false, error: 'invalid userID'}
    
    const connection = await pool.getConnection()
    const query = `
      SELECT * FROM games WHERE userID=?;
    `
    const result = await connection.query(query, [userID]);
    await connection.release();
    return result[0];
  } catch (error) {
    console.error(error)
    return { error: error }
  } finally {
    await connection.release();
  }
}

const clearGameEntries = async userID => {
  try {
    const connection = await pool.getConnection();
    const query = `
      DELETE FROM games as g WHERE g.userID=?;
    `
    const result = await connection.query(query, [userID]);
    return { success: true, result: result }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } finally {
    await connection.release();
  }
}
//Add in function that returns aggergate stats for leaderboard (JOINT for users.id & games.userID)\
//Sub-query on user stats -> pull average stats and return stats ranked (WPM)

module.exports = { createGameEntry, getGameEntries, clearGameEntries }
