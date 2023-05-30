const mysql = require('mysql2')
const config = require('../utils/config.js')

const pool = mysql
  .createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
  })
  .promise()

const closePool = async () => {
  pool.end()
}

module.exports = { pool, closePool }
