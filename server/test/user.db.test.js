const axios = require('axios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { closePool } = require('../db/pool')
const { JWT_SECRET } = require('../utils/config')
const {
  createUser,
  getUserID,
  deleteUser,
  authenticate,
  updateLastLogin,
  getUser,
  updateUser
} = require('../db/user-db')

const { saltRounds } = require('../utils/auth')

test('user-db functions: createUser, getUserID, removeUser work as intended', async () => {
  const testUser = {
    user: 'elijah',
    pw: 'ohno'
  }

  const hash = await bcrypt.hash(testUser.pw, saltRounds)
  const resCreate = await createUser(testUser.user, hash)
  expect(resCreate).toMatchObject({ success: true, created: testUser.user })

  const resID = await getUserID(testUser.user)
  expect(typeof resID).toBe(typeof 1)

  const resDelete = await deleteUser(testUser.user, testUser.pw)
  expect(resDelete).toMatchObject({ success: true, deleted: testUser.user })

  const errorHopefully = await getUserID(testUser.user)
  expect(errorHopefully).toMatchObject({
    success: false,
    error: `User ${testUser.user} not found`
  })
})

test('createUser returns error on duplicate user', async () => {
  const testUser = {
    user: 'elijah',
    pw: 'ohno'
  }
  const resCreate = await createUser(
    testUser.user,
    await bcrypt.hash(testUser.pw, saltRounds)
  )
  expect(resCreate).toMatchObject({ success: true, created: testUser.user })

  const resCreateDuplicate = await createUser(testUser.user, 'somejunk')
  expect(resCreateDuplicate).toMatchObject({
    success: false,
    error: `User ${testUser.user} already exists`
  })

  const resDelete = await deleteUser(testUser.user, testUser.pw)
  expect(resDelete).toMatchObject({ success: true, deleted: testUser.user })

  const resCreateAgain = await createUser(
    testUser.user,
    await bcrypt.hash(testUser.pw, saltRounds)
  )
  expect(resCreateAgain).toMatchObject({
    success: true,
    created: testUser.user
  })

  const resDeleteAgain = await deleteUser(testUser.user, testUser.pw)
  expect(resDeleteAgain).toMatchObject({
    success: true,
    deleted: testUser.user
  })
})

test('authenticate works properly', async () => {
  const testUser = {
    user: 'elijah',
    pw: 'ohno'
  }

  const resCreate = await createUser(
    testUser.user,
    await bcrypt.hash(testUser.pw, saltRounds)
  )
  expect(resCreate).toMatchObject({ success: true, created: testUser.user })

  const resAuthenticate = await authenticate(testUser.user, testUser.pw)
  expect(resAuthenticate.success).toBe(true)

  const resWrongPassword = await authenticate(testUser.user, 'notmypassword')
  expect(resWrongPassword.success).toBe(false)

  const resWrongUser = await authenticate('fakeusername', testUser.pw)
  expect(resWrongUser).toMatchObject({
    success: false,
    error: `User fakeusername doesn't exist`
  })

  const resWrongEverything = await authenticate('fakeusername', 'notmypassword')
  expect(resWrongEverything).toMatchObject({
    success: false,
    error: `User fakeusername doesn't exist`
  })

  await deleteUser(testUser.user, testUser.pw)
})

// write test for updateLastLogin, updateUser, getUser

test('getUser, updateLastLogin works as intended', async () => {
  const testUser = {
    user: 'elijah',
    pw: 'ohno'
  }

  const resCreate = await createUser(
    testUser.user,
    await bcrypt.hash(testUser.pw, saltRounds)
  )
  expect(resCreate).toMatchObject({ success: true, created: testUser.user })

  const userID = await getUserID(testUser.user)

  const resGetUser = await getUser(userID)
  expect(resGetUser.user.username).toBe(testUser.user)
  expect(resGetUser.user.last_login === null).toBe(true)

  const resUpdateLastLogin = await updateLastLogin(userID)
  expect(resUpdateLastLogin.success).toBe(true)

  const resGetUserAgain = await getUser(userID)
  expect(resGetUserAgain.user.username).toBe(testUser.user)
  expect(resGetUserAgain.user.last_login === null).toBe(false)

  await deleteUser(testUser.user, testUser.pw)
})

// write test for updateUser!!!
test('getUser, updateLastLogin works as intended', async () => {
  const testUser = {
    user: 'eli',
    pw: 'ohno'
  }
  expect(2).toBe(2)
})

afterAll(() => closePool())
