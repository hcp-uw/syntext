const axios = require('axios')
const { verifyAccessToken } = require('../utils/auth')
const { getUserID, getUser } = require('../db/user-db')
const baseURL = 'http://localhost:3001/api/user' // Update with the correct URL

describe('POST /create', () => {
  it('returns 400 if missing required fields', async () => {
    try {
      const response = await axios.post(`${baseURL}/create`, {
        username: 'testuser'
      })
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data.success).toBe(false)
      expect(error.response.data.error).toBe('Missing required fields')
    }
  })

  it('returns 201 and a success object on valid request', async () => {
    const testUser = { username: 'testuser', password: 'password123' }
    const response = await axios.post(`${baseURL}/create`, testUser)
    expect(response.status).toBe(201)
    expect(response.data.success).toBe(true)
    expect(response.headers['authorization']).toBeDefined()
    const token = response.headers['authorization']
    const idRes = await axios.get(`${baseURL}/id?username=${testUser.username}`)
    const resTokenVerify = await verifyAccessToken(token, idRes.data.userID)

    expect(resTokenVerify.userID).toBe(idRes.data.userID)

    expect(typeof resTokenVerify.userID).toBe('number')
    const resDelete = await axios.delete(`${baseURL}/account`, {
      headers: {
        Authorization: token
      },
      data: {
        username: testUser.username,
        password: testUser.password,
        userID: resTokenVerify.userID
      }
    })
    expect(resDelete.status).toBe(200)
  })
})

describe('POST /login', () => {
  const validUser = { username: 'testuser', password: 'password123' }
  const invalidUser = { username: 'testuser', password: 'wrongpassword' }
  let authToken
  let userID

  beforeAll(async () => {
    // Create a test user
    const response = await axios.post(`${baseURL}/create`, validUser)

    const idRes = await axios.get(
      `${baseURL}/id?username=${validUser.username}`
    )
    userID = idRes.data.userID
    // Get the auth token for the test user
    authToken = response.headers['authorization']
  })

  afterAll(async () => {
    // Delete the test user
    await axios.delete(`${baseURL}/account`, {
      headers: {
        Authorization: authToken
      },
      data: {
        username: validUser.username,
        password: validUser.password,
        userID: userID
      }
    })
  })

  it('returns 400 if missing required fields', async () => {
    try {
      const response = await axios.post(`${baseURL}/login`, {
        username: validUser.username
      })
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data.success).toBe(false)
      expect(error.response.data.error).toBe('Missing required fields')
    }
  })

  it('returns 401 if provided invalid credentials', async () => {
    try {
      const response = await axios.post(`${baseURL}/login`, invalidUser)
    } catch (error) {
      expect(error.response.status).toBe(401)
      expect(error.response.data.success).toBe(false)
      expect(error.response.data.error).toBe('Invalid username or password')
    }
  })

  it('returns 200 and an auth token if provided valid credentials', async () => {
    const response = await axios.post(`${baseURL}/login`, validUser)
    expect(response.status).toBe(200)
    expect(response.headers['authorization']).toBeDefined()
    const token = response.headers['authorization']
    const resTokenVerify = await verifyAccessToken(token, userID)
    expect(resTokenVerify.userID).toBe(userID)
  })

  it('updates the last login time for the user', async () => {
    // Get the current last login time for the user
    const user = await getUser(validUser.username)
    const previousLastLogin = user.last_login

    // Login as the user
    const response = await axios.post(`${baseURL}/login`, validUser)

    // Check that the response includes the user's data
  })
})

describe('GET /account', () => {
  it('gets the token from the req and verifies it, returning account data', async () => {
    try {
      const testUser = { username: 'getme', password: 'password123' }
      const response = await axios.post(`${baseURL}/create`, testUser)
      expect(response.status).toBe(201)
  
      const token = response.headers['authorization']
      const idRes = await axios.get(`${baseURL}/id?username=${testUser.username}`)
  
      userID = idRes.data.userID
      const resGet = await axios.get(`${baseURL}/account?userID=${userID}`, {
        headers: {
          Authorization: token
        }
      })
  
      expect(resGet.status).toBe(200)
      expect(resGet.data.username).toBe('getme')
      expect(resGet.data.success).toBe(true)
    } catch (error) {
      console.error(error)
    }
  })
})

describe('DELETE /account', () => {
  it('gets the token from the req and verifies it, deleting account', async () => {
    console.log('point 2')
    expect(2).toBe(2)

    const testUser = { username: 'rip', password: 'password123' }
    const response = await axios.post(`${baseURL}/create`, testUser)
    expect(response.status).toBe(201)

    const token = response.headers['authorization']
    const idRes = await axios.get(`${baseURL}/id?username=${testUser.username}`)

    userID = idRes.data.userID

    const resDelete = await axios.delete(`${baseURL}/account`, {
      headers: {
        Authorization: token
      },
      data: {
        username: testUser.username,
        password: testUser.password,
        userID: userID
      }
    })

    expect(resDelete.status).toBe(200)

    const nonexistantUserID = await getUserID(testUser.username)
    expect(nonexistantUserID.success).toBe(false)
  })
})
