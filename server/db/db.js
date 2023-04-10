// get the client
const mysql = require('mysql2');
const config = require('../utils/config.js')
const {toAscii, toChar} = require('./betweenASCIIValues')


const pool = mysql.createPool({
    host: config.MYSQL_HOST, 
    user: config.MYSQL_USER,
    password: config.MYSQL_ROOT_PASSWORD,
    database: config.MYSQL_DATABASE
}).promise()

const getSnippetByLengthAndType = async (length, type) => {
    console.table({
        host: config.MYSQL_HOST, 
        user: config.MYSQL_USER,
        password: config.MYSQL_ROOT_PASSWORD,
        database: config.MYSQL_DATABASE
    })
    return filteredResult = getSnippetByType(type).then(result => {
        return result.filter(snippet => snippet.length === length)
    })
}

const getSnippetByType = async (type) => {
    try {
        const connection = await pool.getConnection();
        const query = `
            SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text
            FROM snippet_records rec INNER JOIN snippet_data data 
            ON rec.id = data.id 
            WHERE rec.snippet_type = ? 
            ORDER BY data.line_index ASC;
        `;
        const result = await connection.query(query, [type]);
        const charData = result[0].map(line_data => {
            return {...line_data, line_text: toChar(JSON.parse(line_data.line_text)).join('')}
        });
        let intermediateResult = {};
        charData.forEach(line => {
            if (!intermediateResult[line.id]) { 
                intermediateResult[line.id] = {
                    id: line.id,
                    length: line.snippet_length, 
                    type: line.snippet_type, 
                    data: line.line_text 
                }
            } else {
                intermediateResult[line.id] = { 
                    ...intermediateResult[line.id], 
                    data: intermediateResult[line.id].data += '\n' + line.line_text 
                }
            }
        })
        let processedResult = []
        Object.keys(intermediateResult).forEach(id => {
            const d = intermediateResult[id].data
            processedResult.push({...intermediateResult[id], data: d.split('\n')})    
        })
        return processedResult
    } catch (error) {
        console.error(error);
    } 
};

const createSnippet = async (snippet, pool) => {

    const { id, type, length, data } = snippet;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction()
        // Insert the snippet record into snippet_records table
        const recordQuery = "INSERT INTO syntext.snippet_records (id, snippet_type, snippet_length) VALUES (?, ?, ?);";
        await connection.query(recordQuery, [id, type, length]);
        const preparedValues = []
        // Insert each array in the data array into snippet_data table
        const dataQueries = data.map((array, arrayIndex) => {
            preparedValues[arrayIndex] = ({id:id, i:arrayIndex, d: toAscii(array)})
            return "INSERT INTO syntext.snippet_data (id, line_index, line_text) VALUES (?, ?, '[?]');";
        });
        await Promise.all(dataQueries.map((query, index) => 
            connection.query(query, [preparedValues[index].id, preparedValues[index].i, preparedValues[index].d])));
        await connection.commit();
        return {
            outcome: 'success',
            created: {id, type, length}
        };
    } catch (error) {
        console.error(error);
        await connection.rollback();
        return error;
    } finally {
        await connection.release();
    }
};

const deleteSnippetByID = async (id) => {
    const connection = await pool.getConnection();
    try {
        const query1 = 'DELETE FROM snippet_records WHERE id = ?';
        const query2 = 'DELETE FROM snippet_data WHERE id = ?';
        await connection.beginTransaction();
        await connection.query(query1, [id]);
        await connection.query(query2, [id]);
        connection.commit();
        console.log(`snippet with id ${id} deleted`)
    } catch (error) {
        console.error(error);
        connection.rollback();
        return error;
    } 
};

const getSnippetByLength = async (length) => {
    try {
        const connection = await pool.getConnection();
        const query = `
            SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text 
            FROM snippet_records rec INNER JOIN snippet_data data 
            ON rec.id = data.id 
            WHERE rec.snippet_length = ? 
            ORDER BY data.line_index ASC;
        `;
        const result = await connection.query(query, [length]);
        connection.release();
        const characterConvertedData = result[0].map(line_data => {
            return {...line_data, line_text: toChar(JSON.parse(line_data.line_text)).join('')}
        });

        let intermediateResult = {};
        characterConvertedData.forEach(line => {
            if (!intermediateResult[line.id]) { 
                intermediateResult[line.id] = {
                    id: line.id,
                    length: line.snippet_length, 
                    type: line.snippet_type, 
                    data: line.line_text 
                }
            } else {
                intermediateResult[line.id] = { 
                    ...intermediateResult[line.id], 
                    data: intermediateResult[line.id].data += '\n' + line.line_text 
                }
            }
        })

        let processedResult = []
        Object.keys(intermediateResult).forEach(id => {
            const d = intermediateResult[id].data
            processedResult.push({...intermediateResult[id], data: d.split('\n')})    
        })
        return processedResult
    } catch (error) {
        console.error(error);
    } 
};


const getSnippetByID = async (id) => {
    const connection = await pool.getConnection();
    const query = `
            SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text 
            FROM snippet_records rec, snippet_data data 
            WHERE rec.id = ? AND 
            rec.id = data.id 
            ORDER BY data.line_index ASC;
    `;
    try {
        const data = await connection.query(query, [id]);
        const  result = data[0].map(line_data =>  {
            return {...line_data, line_text: toChar(JSON.parse(line_data.line_text)).join('')} 
        });

        let type = result[0].snippet_type;
        let length = result[0].snippet_length;
        const processedSnippetText = result.map((line) => line.line_text);
        const processedResult = {
            id: id,
            type: type,
            length: length,
            data: processedSnippetText
        };
        
        return processedResult;
    } catch (error) {
        return {};
        console.error(error);
    } finally {
        connection.release();
    }
};

const getPool = () => {
    return pool;
}

const closePool = async () => {
    return pool.end();
}


module.exports = {
    getSnippetByType, 
    getSnippetByLength, 
    getSnippetByID, 
    createSnippet, 
    deleteSnippetByID,
    getSnippetByLengthAndType,
    getPool,
    closePool
}