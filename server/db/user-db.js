const mysql = require('mysql2');
const config = require('../utils/config.js')

const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()



// creates user 
const createUser = async (username, hash, salt) => {
    try {
        const connection = await pool.getConnection();
        // Check if username exists in table
        const query = 'SELECT username FROM users WHERE username = ?';
        const result = await connection.query(query, [username]);
        //checks if any rows were returned
        if (result[0].length > 0) {
            return {error: `User ${username} already exists`}; 
        } else  {
            const insert = 'INSERT INTO users (userID, username, salt, hash_password, date_created, last_login) VALUES (NULL, ?, ?, ?, CURRENT_DATE, NULL)'
            const result = await pool.query(insert, [username, salt, hash]);
            console.log('User created successfully');
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}


// get salt from db based on username
const getSalt = async (username) => {
    try {
        const connection = await pool.getConnection();
        const query = 'SELECT salt FROM users WHERE username = ?';
        const result = await connection.query(query, [username]);
        const rows = result[0];
        if (rows.length > 0) {
            return rows[0].salt;
        } else {
            return {error: `User ${username} not found`};
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}


const authenticate = async (username, hash) => {
    try {
        const connection = await pool.getConnection();
        // Check if username exists in table
        const query = 'SELECT username, hash_password FROM users WHERE username = ?';
        const result = await connection.query(query, [username]);
        //checks if any rows were returned
        if (result[0].length === 0) {
            return {error: `User ${username} doesn't exist`}; 
        } else  {
            const user = result[0][0];
            const savedHash = user.hash_password;
            return hash === savedHash;
        }
    } catch (error) {
        console.error(error);
        return error;
    } 
}

module.exports = {
    createUser,
    getSalt,
    authenticate
}