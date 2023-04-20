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
    // SELECT username from users where username = ?
    //if it does, error
    // insert into users values (...);
    //if it doesnt, insert row
}


// get salt from db based on username
const getSalt = (username) => {
    // select salt from users where username = ?
}



// boolean, checks if hash matches
const authenticate = (username, hash) => {
    // select hash from users where username = ?
    // hash === hash????
}