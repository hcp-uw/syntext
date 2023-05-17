const { createSnippet } = require('../snippetService')
const { createUser, getUserID } = require('../userService')
const { createGame } = require('../gameService')
const { snippets } = require('./testingData')
const { users } = require('./testingData')
const { games } = require('./testingData')

const createSnippets = async () => {
  for (let snippet of snippets) {
    const res = await createSnippet(snippet)
    if (!res.success) console.log('error creating snippets')
  }
}
const createUsers = async () => {
  for (let user of users) {
    const res = await createUser({
      username: user.username,
      password: user.password
    })
    if (!res.success) console.log('error creating users')
    user.token = res.token
    const id = await getUserID(user.username)
    user.id = id
  }
}
const createGames = async () => {
  for (let game of games) {
    game.userID = users[0].userID
    const res = await createGame(game)
    if (!res.success) console.log('error creating games')
  }
}
const createEnviornment = async () => {
  await createSnippets()
  await createUsers()
  await createGames()
}
createEnviornment().then(() => console.log('all done!'))
