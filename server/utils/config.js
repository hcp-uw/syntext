require('dotenv').config()
require('dotenv').config({ path: '../.env'})

const PORT = process.env.PORT
const MYSQL_HOST = process.env.MYSQL_HOST 
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
const MYSQL_DATABASE = process.env.MYSQL_DATABASE

module.exports = {
  PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
}