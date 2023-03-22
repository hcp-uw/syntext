const mysql = require('mysql2');


const user = process.argv[2];
const pw = process.argv[3];
const host = process.argv[4];
const database = process.argv[5];

const p2 = mysql.createPool({
    host: host,
    user: user,
    password: pw,
    database: database
})

try{
    p1.getConnection()
} catch (err) {
    console.log(err)
}