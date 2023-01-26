const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')


app.listen(config.PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
