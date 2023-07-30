import mysql, { QueryError } from 'mysql2'
import * as config from '../utils/config'
import bcrypt from 'bcrypt'
import { pool } from './pool'
import { GameSummary, Result } from '../types'

const missingRequiredParams = (name: string, obj: any) => {
  return { success: false, error: `missing required params in ${name}: ${obj}` }
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


export const createGameEntry = async (game: GameSummary): Result<undefined> => {
  
  const {
    userID,
    snippet_id,
    total_time,
    total_characters,
    wpm_data,
    wpm_avg,
    accuracy,
    num_mistakes,
  } = game

  try {

    const query = `
      INSERT INTO games ( 
        id, userID, snippet_id, 
        total_time, total_characters, 
        wpm_data, wpm_avg, accuracy, 
        num_mistakes, time_stamp 
      ) 
      VALUES ( NULL,?,?,?,?,?,?,?,?, NOW() );
    `
    const result = await pool.query(query, [
      userID,
      snippet_id,
      total_time,
      total_characters,
      wpm_data.toString(),
      wpm_avg,
      accuracy,
      num_mistakes
    ])

    return { success: true }

  } catch (error: unknown) {
    console.error(error)
    return { success: false, error: error }
  }
}

// FIXME
export const getGameEntries = async (userID: number): Result<Array<GameSummary>> => {
  try {
    const query = `
      SELECT * FROM games WHERE userID=?;
    `
    const result: any = await pool.query(query, [userID])

    return { success: true, result: result[0] }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } 
}


export const getAllGames = async (): Result<Array<GameSummary>> => {
  try {
    const query = `
      SELECT * FROM games;
    `
    const result: any = await pool.query(query)

    return { success: true, result: result[0] }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } 
}

// FIXME
export const clearGameEntries = async (userID: number): Result<undefined> => {
  try {
    const query = `
      DELETE FROM games as g WHERE g.userID=?;
    `
    await pool.query(query, [userID])
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } 
}
