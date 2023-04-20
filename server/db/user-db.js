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
        // Check if username exists in table
        const query = 'SELECT username FROM users WHERE username = ?';
        const result = await pool.query(query, [username]);
        //checks if any rows were returned
        if (result.length > 0) {
          throw new Error('Username already exists'); 
        } else  {
            const result = await pool.query('INSERT INTO users (username, salt, hash_password, date_created, last_login) VALUES (?, ?, ?, CURRENT_DATE, NULL)', [username, salt, hash]);
            console.log('User created successfully');
        }
    } catch (error) {
        console.error(error);
        connection.rollback();
        return error;
    } 
}


// get salt from db based on username
const getSalt = async (username) => {
    try {
        const query = 'SELECT salt FROM users WHERE username = ?';
        const result = await pool.query(query, [username]);
        const rows = result[0];
        if (rows.length > 0) {
            return rows[0].salt;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}




const authenticate = async (username, hash) => {
    try {
        // Check if username exists in table
        const query = 'SELECT username FROM users WHERE username = ?';
        const result = await pool.query(query, [username]);
        if (result.length > 0) {
            const user = result[0];
            const savedHash = user.hash_password;
            return hash === savedHash;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(error);
        return error;
    } 
}
