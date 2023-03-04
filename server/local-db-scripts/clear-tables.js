const mysql = require('mysql2');
const config = require('../utils/config')

const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()

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

Promise.all([clearDataTable(), clearRecordTable()]).then(() => process.exit())

