const mysql = require('mysql2');
const config = require('../utils/config')

const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()


const createSettingsTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = `
            CREATE TABLE IF NOT EXISTS settings (type varchar(16) NOT NULL, userID int NOT NULL, value varchar(256) NOT NULL, primary key (type, userID), foreign key (userID) references users(userID));`;
        const result = await connection.query(query);
        connection.release();
        console.log('created settings')
        return result[0];
    } catch (error) {
        console.error(error);
    } 
};



createSettingsTable()
    .then(() => pool.end());
