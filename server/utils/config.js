require('dotenv').config()
require('dotenv').config({ path: '../.env'})

const NODE_PORT = process.env.NODE_PORT
const MYSQL_PORT = process.env.MYSQL_PORT
const MYSQL_HOST = process.env.MYSQL_HOST 
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_ROOT_PASSWORD = process.env.MYSQL_PASSWORD
const MYSQL_DATABASE = process.env.MYSQL_DATABASE

module.exports = {
  NODE_PORT,
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE
}