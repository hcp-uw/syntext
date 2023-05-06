const mysql = require('mysql2');
const config = require('../utils/config')

const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()

const createUserTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = `CREATE TABLE IF NOT EXISTS users (userID int NOT NULL AUTO_INCREMENT, username varchar(256) NOT NULL, salt varchar(32), hash_password char(64) NOT NULL, date_created date, last_login date, primary key (userID));`;
        const result = await connection.query(query);
        await connection.release();
        console.log('created users')
        return result[0];
    } catch (error) {
        console.error(error);
    } 
};


createUserTable()
    .then(() => pool.end());
