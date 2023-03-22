const app = require('./app') 
const config = require('./utils/config')

console.log(config)

app.listen(config.NODE_PORT, () => {
  console.log(`Server running on port test ${config.NODE_PORT}`)
})

