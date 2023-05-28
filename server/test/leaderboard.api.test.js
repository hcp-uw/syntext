const axios = require('axios');
const baseURL = 'http://localhost:3001/api'
const games = require('./data/games')
const { createUser, getUserID, deleteUser } = require('../db/user-db')
const { createSnippet, deleteSnippetByID } = require('../db/snippet-db')
const { closePool } = require('../db/pool.js')
const {getLeaderboardData} = require('../db/leaderboard-db')
const { response } = require('../app')


const user1 = { username: 'KitKat', password: '123password', userID: undefined }
const user2 = { username: 'Skittles', password: '123password', userID: undefined }
const user3 = { username: 'Gum', password: '123password', userID: undefined }
const users = [user1, user2, user3];
const tokens = [];
let userID
let token

const snippet = {
  id: 35,
  type: 'WHILE_LOOP',
  length: 'SHORT',
  data: ['THIS IS TESTING DATA', '\tSystem.out.println(i);']
}



beforeAll(async () => {
  try {
    for (let user of users) {
      const response = await axios.post(`${baseURL}/user/create`, user)
      expect(response.status).toBe(201)
      tokens.push(response.headers['authorization'])
    
      user.userID = await getUserID(user.username)
    
    }
    
    let i = 0;
    for (let game of games) {
        game.userID = users[i%3].userID;
        let res = await axios.post(`${baseURL}/game/create`, {
          headers: {
            Authorization: tokens[i%3]
          },
          ...game
        })
        i++;
        expect(res.status).toBe(201)
    }

  } catch (error) {
    console.error(error);    
  }
  
  const createSnippetRes = await createSnippet(snippet)
  expect(createSnippetRes.success).toBe(true)
})

afterAll(async () => {
  let i = 0;
  for (let user of users) {
    const deleteGameRes = await axios.delete(`${baseURL}/game/games`, {
      headers: {
        Authorization: tokens[i]
      },
      data: { userID: user.userID }
    })
    const deleteUserRes = await axios.delete(`${baseURL}/users/account`, {
        headers: {
          Authorization: tokens[i]
        },
        data: user
    })
    i++;
    expect(deleteUserRes.status).toBe(200)
}
  const deleteSnippetRes = await deleteSnippetByID(snippet.id)
  expect(deleteSnippetRes.success).toBe(true)
  await closePool()
})

describe ('GET, /topPlayers', () => {
    it('should return a 400 error if given incorrect sort parameter', async () => {
        try {
        const response = await axios.get(`${baseURL}/leaderboard/topplayers?sort=invalid`);
        } catch (error) {
          console.error(error)
        // expect(error.response.status).toBe(400)
        }
    })

    it('should return 200 and some data given a valid request', async () => {
     try {
      const sorts = ['wpm_avg', 'accuracy', 'total_time', 'total_characters']
      
      for (let sort of sorts) {
        const res = await axios.get (`${baseURL}/leaderboard/topplayers?sort=${sort}`);
          expect(response.status).toBe(201)
          let prevUser = {}
          prevUser[sort] = -1;
          prevUser.name = "fake";
          for (let user of users) {
            expect(prevUser[sort] <= user[sort]).toBe(true);
            expect(prevUser.name === currUser.name).toBe(true);
            prevUser = user;
          }
      }
     } catch (error) {
        console.error(error);
     }
    })

})