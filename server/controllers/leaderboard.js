const { getUserID } = require('../db/user-db')
const {getLeaderBoardData} = require ('../db/leaderboard-db')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

gameRouter.get('/topPlayers', jsonParser, async (req, res) => {
    if (req !== 'wpm_avg' && req !== 'accuracy' && req !== 'total_time' && req !== 'total_characters') {
      return res
      .status(400)
      .send({ error: 'Bad Request: Incorrect data in request body' })
    }
  try {
    const users = await getLeaderboardData(sortParam);
    const userScores = [];

    for (const user of users) {
      const playerData = await getUserID(user.userID);
      userScores.push({
        name: playerData.name,
        wpm_avg: playerData.wpm_avg,
        accuracy: playerData.accuracy,
        total_time: playerData.total_time,
        total_characters: playerData.total_characters
      });
    }
    res.status(200).send(userScores);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
