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
      userScores({
        name: playerData.name,
        wpm_avg: user.wpm_avg,
        accuracy: user.accuracy,
        total_time: user.total_time,
        total_characters: user.total_characters
      });
    }
    res.status(200).send(userScores);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
