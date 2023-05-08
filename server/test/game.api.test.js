const axios = require('axios')
const baseURL = 'http://localhost:3001/api/games'
const { createUser, getUserID, deleteUser } = require('../db/user-db')
const { createSnippet, deleteSnippetByID } = require('../db/snippet-db')
const { closePool } = require('../db/pool.js')

const user = { username: 'KitKat', password: '123password' }

let userID

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
  // TODO:  create user w/ corresponding axios

  userID = await getUserID(user.username)

  game1.userID = userID;
  game2.userID = userID;

  const createSnippetRes = await createSnippet(snippet)
  expect(createSnippetRes.success).toBe(true)
})

afterAll(async () => {
  const deleteUserRes = await deleteUser(user.username, user.password)
  console.log(deleteUserRes)
  expect(deleteUserRes.success).toBe(true)

  const deleteSnippetRes = await deleteSnippetByID(snippet.id)
  expect(deleteSnippetRes.success).toBe(true)
  closePool()
})

describe('POST /create', () => {
  // TODO: write tests for creating game entries with
  // both valid and invalid req bodies, checking if the
  // correct errors are thrown

  it('returns 400 if missing required fields', async () => {
    try {
      const response = await axios.post(`${baseURL}/create`, { not: 'correct' })
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data.success).toBe(false)
      expect(error.response.data.error).toBe('Missing required fields')
    }
  })

  it('returns 201 if success', async () => {})
})

describe('GET /games', () => {
  // TODO: write tests for retrieving both existing
  // and non-existing game-entries, checking if the
  // correct errors are thrown, and if the expected
  // results are returned

  // NOTE: you will have to create them to test this.

  it('returns 400 and an error if missing required fields', async () => {})

  it('returns 200 and expected data if provided userID', async () => {})

  it('returns 200 and expected data if provided username', async () => {})

  it('returns 200 and no data if no games exist for specified user', async () => {
    // create a new user to test this
  })
})

describe('DELETE')
