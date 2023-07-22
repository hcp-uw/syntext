const { getSnippetData } = require('../example_data/hardcodedsnippets')
const { createSnippet, closePool } = require('../db/snippet-db')
const { processSnippet } = require('../example_data/processSnippet')
const mysql = require('mysql2');
const config = require('../utils/config')


console.table(config)

const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()

// const exampleSnippets = getSnippetData();
const exampleSnippets = processSnippet("./src/example_data/snippets")

const fill = async (exampleData) => {
    // console.log(exampleData)
    // await exampleData.forEach( async (snippet) => {
    //     const res = await createSnippet(snippet)
    //     console.log(res)
    //     console.log("added snippet " + snippet.type)
    // });

    for (let snippet of exampleData) {
        const res = await createSnippet(snippet)
        console.log(res)
        // console.log("added snippet " + snippet.type)
    }
    
}

fill(exampleSnippets, pool)
    .then(() => console.log("filled tables"))
    .then(() => pool.end())
    .then(() => console.log("pool closed"));
    


