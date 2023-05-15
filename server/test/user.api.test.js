const axios = require('axios')
const { verifyToken } = require('../utils/auth')
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
    const resTokenVerify = await verifyToken(token)
    expect(resTokenVerify.username).toBe(testUser.username)
    expect(typeof resTokenVerify.userID).toBe("number")
    const resDelete = await axios.delete(`${baseURL}/account`, {
      headers: {
        Authorization: token 
      },
      data: {
        username: testUser.username,
        password: testUser.password
      }
    })
    expect(resDelete.status).toBe(200)
  })
})

describe('POST /login', () => {
  const validUser = { username: 'testuser', password: 'password123' }
  const invalidUser = { username: 'testuser', password: 'wrongpassword' }
  let authToken

  beforeAll(async () => {
    // Create a test user
    const response = await axios.post(`${baseURL}/create`, validUser)

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
        password: validUser.password
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
    const resTokenVerify = await verifyToken(token)
    expect(resTokenVerify.username).toBe(validUser.username)
    expect(typeof resTokenVerify.userID).toBe('number')
  })

  it('updates the last login time for the user', async () => {
    // Get the current last login time for the user
    const user = await getUser(validUser.username);
    const previousLastLogin = user.last_login;

    // Login as the user
    const response = await axios.post(`${baseURL}/login`, validUser);

    // Check that the response includes the user's data

  });
})


describe('GET /account', () => {
  it('gets the token from the req and verifies it, returning account data', async () => {
    const testUser = { username: 'getme', password: 'password123' }
    const response = await axios.post(`${baseURL}/create`, testUser)
    expect(response.status).toBe(201)
   
    const token = response.headers['authorization']
  
    const resGet = await axios.get(`${baseURL}/account`, {
      headers: {
        Authorization: token
      }
    })
    expect(resGet.status).toBe(200);
    expect(resGet.data.username).toBe('getme');
    expect(resGet.data.success).toBe(true);
  })
})


describe('DELETE /account', () => {
  it('gets the token from the req and verifies it, deleting account', async () => {
    const testUser = { username: 'deleteme', password: 'password123' }
    const response = await axios.post(`${baseURL}/create`, testUser)
    expect(response.status).toBe(201)
   
    const token = response.headers['authorization']
  
    const resDelete = await axios.delete(`${baseURL}/account`, {
      headers: {
        Authorization: token
      },
      data: {
        username: testUser.username,
        password: testUser.password
      }
    })

    expect(resDelete.status).toBe(200);

    const nonexistantUserID = await getUserID(testUser.username);
    expect(nonexistantUserID.success).toBe(false);
  })
})
