const mysql = require('mysql2');
const config = require('../utils/config.js')
const bcrypt = require('bcrypt')

const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()

const getUserID = async (username) => {
    try {
        const connection = await pool.getConnection();
        const query = 'SELECT userID FROM users WHERE username = ?';
        const result = await connection.query(query, [username]);
        const rows = result[0];
        if (rows.length > 0) {
            return rows[0].userID;
        } else {
            return {success: false, error: `User ${username} not found`};
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

// creates user 
const createUser = async (username, hash) => {
    try {
        const connection = await pool.getConnection();
        // Check if username exists in table
        const query = 'SELECT username FROM users WHERE username = ?';
        const result = await connection.query(query, [username]);
        //checks if any rows were returned
        if (result[0].length > 0) {
            return {error: `User ${username} already exists`}; 
        } else  {
            const insert = 'INSERT INTO users (userID, username, hash_password, date_created, last_login) VALUES (NULL, ?, ?, CURRENT_DATE, NULL)'
            const result = await pool.query(insert, [username, hash]);
            return {
                success: true,
                created: username
            };
        }
    } catch (error) {
        console.error(error);
        return {...error, success: false};
    }
}


const authenticate = async (username, password) => {
    try {
        const connection = await pool.getConnection();
        // Check if username exists in table
        const query = 'SELECT username, hash_password FROM users WHERE username = ?';
        const result = await connection.query(query, [username]);
        //checks if any rows were returned
        if (result[0].length === 0) {
            return {success: false, error: `User ${username} doesn't exist`}; 
        } else  {
            const user = result[0][0];
            const savedHash = user.hash_password;
            console.table({password, savedHash})
            return { success: await bcrypt.compare(password, savedHash) };
        }
    } catch (error) {
        console.error(error);
        return error;
    } 
}

const deleteUser = async (username, password) => {
    const connection = await pool.getConnection();
    try {
        const isAuthorized = await authenticate(username, password);
        if (!isAuthorized.success) return {...isAuthorized, success: false};
        const id = await getUserID(username);
        const deleteSettings = "DELETE FROM settings AS s WHERE s.userID=?;";
        const deleteGames = "DELETE FROM games AS g WHERE g.userID=?;";
        const deleteUser = "DELETE FROM users AS u WHERE u.userID=?;";
        queries = [deleteSettings, deleteGames, deleteUser];
        await connection.beginTransaction();
        const results = await queries.map(q => connection.query(q, [id]));
        connection.commit();
        return {success: true, deleted: username, result: results};
    } catch (error) {
        console.error(error);
        connection.rollback();
        return {...error, success: false};
    }
} 

const getPool = () => pool;

const closePool = () => { pool.end(); }

module.exports = {
    createUser,
    deleteUser,
    getUserID,
    authenticate,
    getPool,
    closePool
}