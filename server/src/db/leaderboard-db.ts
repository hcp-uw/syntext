const { pool } = require('./pool.js')

// FIXME
export const getLeaderboardData = async (sortParam: 'wpm' | 'accuracy' | 'time' | 'characters') => {
  let s
  switch (sortParam) {
    case 'wpm':
      s = 'avg_wpm'
      break

    case 'accuracy':
      s = 'avg_accuracy'
      break

    case 'time':
      s = 'time_played'
      break

    case 'characters':
      s = 'characters_typed'
      break

    default:
      return { error: 'invalid sort param: ' + sortParam }
      break
  }
  try {
    const query = `
      SELECT u.username, 
          AVG(g.wpm_avg) AS avg_wpm,
          AVG(g.accuracy) AS avg_accuracy,
          SUM(g.total_time) AS time_played,
          SUM(g.total_characters) AS characters_typed
      FROM games g, users u
      WHERE u.userID = g.userID
      GROUP BY username
      ORDER BY ? DESC;
    `
    const res = await pool.query(query, [s])
    return res[0]
  } catch (error) {
    console.error(error)
  }
}
