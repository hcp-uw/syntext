const mysql = require('mysql2');
const config = require('../utils/config')
const {toAscii} = require('../db/betweenASCIIValues')

const pool = mysql.createPool({
    host: "localhost",
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: 'mysql'
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

const user = process.argv[2];
const pw = process.argv[3];
const host = process.argv[4];

createUser(user, pw, host)
    .then(() => {
        console.log('success');
        process.exit()
    })
    .catch((err) => console.log(err))