const mysql = require('mysql2');
const config = require('../utils/config')

const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()

// games (
//     id int primary key auto_increment,
//     username varchar(256) references users(username),
//     snippet_id int,
//     total_time int,
//     total_characters int,
//     wpm_data text,
//     wpm_avg float,
//     accuracy float,
//     num_mistakes int,
//     time_stamp datetime,
// )

const createGamesTable = async () => {
    try {
        const connection = await pool.getConnection();
        const query = 'CREATE TABLE IF NOT EXISTS games (id int primary key auto_increment NOT NULL, userID int NOT NULL, snippet_id int NOT NULL, total_time int NOT NULL, total_characters int NOT NULL, wpm_data text NOT NULL, wpm_avg float NOT NULL, accuracy float NOT NULL, num_mistakes int NOT NULL, time_stamp datetime NOT NULL, foreign key (snippetID) references snippet_records(id),foreign key (userID) references users(userID));';
        const result = await connection.query(query);
        connection.release();
        console.log('created games')
        return result[0];
    } catch (error) {
        console.error(error);
    } 
};



createGamesTable()
    .then(() => pool.end());
