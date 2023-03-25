const mysql = require('mysql2');


const user = process.argv[2];
const pw = process.argv[3];
const host = process.argv[4];
const database = process.argv[5];

const p = mysql.createPool({
    host: host,
    user: user,
    password: pw,
    database: database
}).promise()

try{
    p.getConnection()
} catch (err) {
    console.log(err)
}