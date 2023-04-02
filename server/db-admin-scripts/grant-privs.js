const mysql = require('mysql2');
const config = require('../utils/config')


const pool = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_ROOT_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_ADMIN_DATABASE
}).promise()

const grantPrivs = async (user, host) => {
    try {
        const connection = await pool.getConnection();
        const query = `
            GRANT ALL PRIVILEGES ON *.* TO '${user}'@'${host}';
        `;
        const result = await connection.execute(query);
        connection.release();
        console.log('granted privileges to ' + user)
        return result[0];
    } catch (error) {
        console.error(error);
    }
};


const user = process.argv[2];
const host = process.argv[3];

grantPrivs(user, host)
    .then(() => {
        console.log('success');
        process.exit()
    })
    .catch((err) => console.log(err))
