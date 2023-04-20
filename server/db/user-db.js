const mysql = require('mysql2');
const config = require('../utils/config.js')

const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()



// creates user 
const createUser = (username, hash, salt) => {
    // check if username exists in table
    //if it does, error
    //if it doesnt, insert row

    /* example query (not sure if this is 100% right)
    INSERT INTO users (username, salt, hash_password, date_created, last_login)
    VALUES (username, salt, hash, CURRENT_DATE, NULL);
    */
}


// get salt from db based on username
const getSalt = (username) => {
    /* example query (not sure if this is 100% right)
    SELECT salt FROM users WHERE username = username;
    */
}



// boolean, checks if hash matches
const authenticate = (username, hash) => {
    /* example query (not sure if this is 100% right)
    SELECT hash_password FROM users WHERE username = username;
    */
}