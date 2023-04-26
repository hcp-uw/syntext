require('dotenv').config()
require('dotenv').config({ path: '../.env'})

const PORT = process.env.PORT
const MYSQL_PORT = process.env.MYSQL_PORT
const MYSQL_HOST = process.env.MYSQL_HOST 
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_ROOT_PASSWORD = process.env.MYSQL_ROOT_PASSWORD
const MYSQL_DATABASE = process.env.MYSQL_DATABASE
const MYSQL_ROOT_USER = process.env.MYSQL_ROOT_USER
const MYSQL_ADMIN_DATABASE = process.env.MYSQL_ADMIN_DATABASE
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE,
  JWT_SECRET,
  MYSQL_ROOT_USER,      // for local db managemnt 
  MYSQL_ADMIN_DATABASE  // scripts only. 
}