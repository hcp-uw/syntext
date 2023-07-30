import { Result, GameSummary } from "../types"

const { pool } = require('./pool.ts')

// FIXME
export const getLeaderboardData = async (sort: "typed" | "wpm" | "time" | "accuracy"): Result<Array<GameSummary>> => {

  try {
    const query = `
    SELECT
      u.username,
      AVG(wd.wpm_avg) as wpm,
      AVG(wd.total_time) as time,
      AVG(wd.total_characters) as typed,
      AVG(wd.accuracy) as accuracy
    FROM
        users u
    JOIN
        games wd ON u.userID = wd.userID
    GROUP BY 
      u.username
    ORDER BY ${sort} DESC;
    `

    console.log(query)

    const result: any = await pool.query(query)
    console.log(result[0])
    return { success: true, result: result[0] }
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } 
}