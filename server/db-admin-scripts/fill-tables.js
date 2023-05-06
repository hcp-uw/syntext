const { getSnippetData } = require('../example_data/hardcodedsnippets')
const { createSnippet, closePool } = require('../db/snippet-db')
//const { processSnippet } = require('../example_data/processSnippet')
const mysql = require('mysql2');
const config = require('../utils/config')

console.table(config)

const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()

const exampleSnippets = getSnippetData();
//const exampleSnippets = processSnippet("./snippets")

const fill = async (exampleData) => {
    const promises = []
    await exampleData.forEach((snippet) => {
        promises.push(createSnippet(snippet));
    });
    return Promise.all(promises);
    
}

fill(exampleSnippets, pool)
    .then(() => console.log("filled tables"))
    .then(() => pool.end())
    .then(() => console.log("pool closed"));
    


