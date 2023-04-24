const mysql = require('mysql2');
const config = require('../utils/config')
const {toAscii} = require('../db/betweenASCIIValues')

const pool = mysql.createPool({
    host: "localhost",//config.MYSQL_HOST,
    user: config.MYSQL_ROOT_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_ADMIN_DATABASE
}).promise()

const createUser = async (user, pw, host) => {
    try {
        const connection = await pool.getConnection();
        const query = `
        CREATE USER '${user}'@'${host}' IDENTIFIED BY '${pw}';
        `
        const result = await connection.execute(query);
        connection.release();
        console.log('created user' + user)
        return result[0]
    } catch (error) {
        console.error(error);
    }
};

const user = process.argv[2] || config.MYSQL_USER;
const pw = process.argv[3] || config.MYSQL_ROOT_PASSWORD;
const host = process.argv[4] || config.MYSQL_HOST;

createUser(user, pw, host)
    .then(() => {
        console.log('success');
        pool.end();
    })
    .catch((err) => console.log(err))