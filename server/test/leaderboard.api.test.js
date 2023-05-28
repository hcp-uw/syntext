const axios = require('axios')
const baseURL = 'http://localhost:3001/api'
const games = require('./data/games')
const { createUser, getUserID, deleteUser } = require('../db/user-db')
const { createSnippet, deleteSnippetByID } = require('../db/snippet-db')
const { closePool } = require('../db/pool.js')
const {getLeaderboardData} = require('../db/leaderboard-db')

const user1 = { username: 'KitKat', password: '123password', userID: undefined }
const user2 = { username: 'Skittles', password: '123password', userID: undefined }
const user3 = { username: 'Gum', password: '123password', userID: undefined }
const users = [user1, user2, user3];

let userID
let token

const snippet = {
  id: 35,
  type: 'WHILE_LOOP',
  length: 'SHORT',
  data: ['THIS IS TESTING DATA', '\tSystem.out.println(i);']
}



beforeAll(async () => {
 for (let user of users) {
    const response = await axios.post(`${baseURL}/user/create`, user)
    expect(response.status).toBe(201)
    token = response.headers['authorization']
  
    user.userID = await getUserID(user.username)
  
 }

 game1.userID = user.userID
 game2.userID = user.userID

  const createSnippetRes = await createSnippet(snippet)
  expect(createSnippetRes.success).toBe(true)
})

afterAll(async () => {
for (let user of users) {
    const deleteUserRes = await axios.delete(`${baseURL}/${user}/account`, {
        headers: {
          Authorization: token
        },
        data: user
      })
      expect(deleteUserRes.status).toBe(200)
}
  const deleteSnippetRes = await deleteSnippetByID(snippet.id)
  expect(deleteSnippetRes.success).toBe(true)
  closePool()
})

describe ('GET, /topPlayers', () => {


})