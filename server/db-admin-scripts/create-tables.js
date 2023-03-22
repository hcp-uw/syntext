const mysql = require('mysql2');
const config = require('../utils/config')
const {toAscii} = require('../db/betweenASCIIValues')


const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()


const createRecordTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = 'CREATE TABLE IF NOT EXISTS snippet_records (id int NOT NULL, snippet_type varchar(30) DEFAULT NULL, snippet_length varchar(10) DEFAULT NULL, PRIMARY KEY (id));';
        const result = await connection.query(query);
        connection.release();
        console.log('created snippet_records')
        return result[0];
    } catch (error) {
        console.error(error);
    }
};

const createDataTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = 'CREATE TABLE IF NOT EXISTS snippet_data (id int DEFAULT NULL, line_index int DEFAULT NULL, line_text text);';
        const result = await connection.query(query);
        connection.release();
        console.log('created snippet_data')
        return result[0];
    } catch (error) {
        console.error(error);
    }
};

Promise.all([createRecordTable(), createDataTable()])
    .then(() =>  process.exit());
