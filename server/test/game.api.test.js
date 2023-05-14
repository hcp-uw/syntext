const axios = require('axios')
const baseURL = 'http://localhost:3001/api'
const { createUser, getUserID, deleteUser } = require('../db/user-db')
const { createSnippet, deleteSnippetByID } = require('../db/snippet-db')
const { closePool } = require('../db/pool.js')

const user = { username: 'KitKat', password: '123password' }

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
  const response = await axios.post(`${baseURL}/user/create`, user)
  expect(response.status).toBe(201)
  token = response.headers['authorization']

  userID = await getUserID(user.username)

  game1.userID = userID
  game2.userID = userID

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

describe('POST /create', () => {
  // TODO: write tests for creating game entries with
  // both valid and invalid req bodies, checking if the
  // correct errors are thrown

  it('returns 400 if missing required fields', async () => {
    try {
      const response = await axios.post(`${baseURL}/game/create`, {
        not: 'correct'
      })
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data.success).toBe(false)
    }
  })

  it('returns 201 if success', async () => {
    const res = await axios.post(`${baseURL}/game/create`, {
      headers: {
        Authorization: token
      },
      data: game1
    })

    expect(res.data.success).toBe(true)

    const res2 = await axios.post(`${baseURL}/game/create`, {
      headers: {
        Authorization: token
      },
      data: game2
    })

    expect(res2.data.success).toBe(true)

    const resDelete = await axios.delete(`${baseURL}/game/games`, {
      headers: {
        Authorization: token
      },
      data: {
        username: user.username
      }
    })

    expect(resDelete.status).toBe(200)
  })
})

describe('GET, DELETE /games', () => {
  // TODO: write tests for retrieving both existing
  // and non-existing game-entries, checking if the
  // correct errors are thrown, and if the expected
  // results are returned

  // NOTE: you will have to create them to test this.

  it('returns 400 and an error if missing required fields', async () => {
    try {
      const getRes = await axios.get(`${baseURL}/game/games?chicken=sandwhich`)
    } catch (error) {
      expect(error.response.status).toBe(400)
    }
  })

  it('returns 200 and expected data if provided userID', async () => {
    const res = await axios.post(`${baseURL}/game/create`, {
      headers: {
        Authorization: token
      },
      data: game1
    })

    expect(res.data.success).toBe(true)

    const res2 = await axios.post(`${baseURL}/game/create`, {
      headers: {
        Authorization: token
      },
      data: game2
    })

    expect(res2.data.success).toBe(true)

    const resGet = await axios.get(`${baseURL}/game/games?userID=${userID}`)

    expect(resGet.data.length).toBe(2)
    expect(resGet.data[0].snippet_id).toBe(snippet.id)
    expect(resGet.data[1].userID).toBe(resGet.data[0].userID)

    const resDelete = await axios.delete(`${baseURL}/game/games`, {
      headers: {
        Authorization: token
      },
      data: {
        userID: userID
      }
    })

    expect(resDelete.status).toBe(200)
  })

  it('returns 200 and expected data if provided username', async () => {
    const res = await axios.post(`${baseURL}/game/create`, {
      headers: {
        Authorization: token
      },
      data: game1
    })

    expect(res.data.success).toBe(true)

    const res2 = await axios.post(`${baseURL}/game/create`, {
      headers: {
        Authorization: token
      },
      data: game2
    })

    expect(res2.data.success).toBe(true)

    const resGet = await axios.get(
      `${baseURL}/game/games?username=${user.username}`
    )

    expect(resGet.data.length).toBe(2)
    expect(resGet.data[0].snippet_id).toBe(snippet.id)
    expect(resGet.data[1].userID).toBe(resGet.data[0].userID)

    const resDelete = await axios.delete(`${baseURL}/game/games`, {
      headers: {
        Authorization: token
      },
      data: {
        userID: userID
      }
    })

    expect(resDelete.status).toBe(200)
  })

  it('returns 200 and no data if no games exist for specified user', async () => {
    const emptyUser = { username: 'empty', password: 'empty' }
    const response = await axios.post(`${baseURL}/user/create`, emptyUser)
    expect(response.status).toBe(201)
    emptyToken = response.headers['authorization']

    const resGet = await axios.get(
      `${baseURL}/game/games?username=${emptyUser.username}`
    )

    expect(resGet.status).toBe(200)
    expect(resGet.data.length).toBe(0)

    const deleteUser = await axios.delete(`${baseURL}/user/account`, {
      headers: {
        Authorization: emptyToken
      },
      data: emptyUser 
    })

    expect(deleteUser.status).toBe(200)
  })
})

