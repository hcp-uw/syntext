const axios = require('axios')
const baseURL = 'http://localhost:3001/api'
const { createUser, getUserID, deleteUser } = require('../db/user-db')
const { createSnippet, deleteSnippetByID } = require('../db/snippet-db')
const { closePool } = require('../db/pool.js')

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

let game1 = {
  userID: undefined,
  snippet_id: 35,
  total_time: 30,
  total_characters: 45,
  wpm_data: [99, 100, 101],
  wpm_avg: 100,
  accuracy: 88,
  num_mistakes: 5
}

let game2 = {
  userID: undefined,
  snippet_id: 35,
  total_time: 20,
  total_characters: 45,
  wpm_data: [99, 10, 1],
  wpm_avg: 10,
  accuracy: 8,
  num_mistakes: 500
}

beforeAll(async () => {
 for (let user of users) {
    const response = await axios.post(`${baseURL}/user/create`, user)
    expect(response.status).toBe(201)
    token = response.headers['authorization']
  
    user.userID = await getUserID(user.username)
  
    game1.userID = user.userID
    game2.userID = user.userID
 }

  const createSnippetRes = await createSnippet(snippet)
  expect(createSnippetRes.success).toBe(true)
})

afterAll(async () => {
  const deleteUserRes = await axios.delete(`${baseURL}/user/account`, {
    headers: {
      Authorization: token
    },
    data: user
  })
  expect(deleteUserRes.status).toBe(200)

  const deleteSnippetRes = await deleteSnippetByID(snippet.id)
  expect(deleteSnippetRes.success).toBe(true)
  closePool()
})