const mysql = require('mysql2');
const config = require('../utils/config')


const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()


console.table(
    {
        host: config.MYSQL_HOST, 
        user: config.MYSQL_USER,
        password: config.MYSQL_ROOT_PASSWORD,
        database: config.MYSQL_DATABASE
    }
)

const clearRecordTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = 'DELETE FROM snippet_records WHERE 1 = 1;'
        const result = await connection.query(query);
        connection.release();
        console.log('cleared snippet_records')
        return result[0];
    } catch (error) {
        console.error(error);
    }
}


const clearDataTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = 'DELETE FROM snippet_data WHERE 1 = 1;'
        const result = await connection.query(query);
        connection.release();
        console.log('cleared snippet_data')
        return result[0];
    } catch (error) {
        console.error(error);
    }
}

const clearUserTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = 'DELETE FROM users WHERE 1 = 1;'
        const result = await connection.query(query);
        connection.release();
        console.log('cleared users')
        return result[0];
    } catch (error) {
        console.error(error);
    }
}

const clearSettingsTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = 'DELETE FROM settings WHERE 1 = 1;'
        const result = await connection.query(query);
        connection.release();
        console.log('cleared settings')
        return result[0];
    } catch (error) {
        console.error(error);
    }
}

const clearGamesTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = 'DELETE FROM games WHERE 1 = 1;'
        const result = await connection.query(query);
        connection.release();
        console.log('cleared snippet_data')
        return result[0];
    } catch (error) {
        console.error(error);
    }
}

Promise.all([
    clearDataTable(), 
    clearRecordTable(),
    clearGamesTable(),
    clearSettingsTable(),
    clearUserTable()
]).then(() => pool.end())

