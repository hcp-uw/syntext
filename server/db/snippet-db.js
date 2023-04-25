// get the client
const mysql = require('mysql2');
const config = require('../utils/config.js')
const {toAscii, toChar} = require('./betweenASCIIValues')
const { pool } = require('./pool.js')


// const pool = mysql.createPool({
//     host: config.MYSQL_HOST, 
//     user: config.MYSQL_USER,
//     password: config.MYSQL_ROOT_PASSWORD,
//     database: config.MYSQL_DATABASE
// }).promise()


const getSnippetByLengthAndType = async (length, type) => {
    const result = await getSnippetByType(type)
    return result.filter(snippet => snippet.length === length)
}

const getSnippetByType = async (type) => {
    if (!type || typeof type !== "string") return [];
    try {
        const connection = await pool.getConnection();
        const query = `
            SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text
            FROM snippet_records AS rec, snippet_data AS data 
            WHERE rec.id = data.id AND 
            rec.snippet_type = ? 
            ORDER BY rec.id, data.line_index ASC;
        `;
        const result = await connection.query(query, [type]);
        if (result[0].length === 0) return [];
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


const createSnippet = async (snippet) => {

    let connection;
    const { id, type, length, data } = snippet;

    try {
        connection = await pool.getConnection();
        const recordQuery = "INSERT INTO snippet_records (id, snippet_type, snippet_length) VALUES (?, ?, ?);";
        await connection.query(recordQuery, [id, type, length]);
        const preparedValues = [];
        const insertQuery = "INSERT INTO snippet_data (id, line_index, line_text) VALUES (?, ?, '[?]');";
        let index = 0;
        for (const line of data) {
            preparedValues[index] = {id:id, i:index, d: toAscii(line)}
            index++;
        }  

        // const dataQueries = await data.map((array, arrayIndex) => {
        //     preparedValues[arrayIndex] = ({id:id, i:arrayIndex, d: toAscii(array)})
        //     return "INSERT INTO snippet_data (id, line_index, line_text) VALUES (?, ?, '[?]');";
        // });

        index = 0;
        let values;
        for (const values of preparedValues) { 
            //values = preparedValues[index]
            await connection.query(insertQuery, [values.id, values.i, values.d]);
            index++;
        }

        await connection.release()
        return {
            success: true,
            created: {id, type, length}
        };
    } catch (error) {
        console.error(error);
        return { ...error, success: false };
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
        await connection.commit();
        await connection.release();
        return { success: true }
    } catch (error) {
        console.error(error);
        await connection.rollback();
        await connection.release()
        return {...error, success: false};
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
        connection.release()
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
        connection.release();
        return processedResult;
    } catch (error) {
        return {};
        console.error(error);
    } finally {
        connection.release();
    }
};

const getPool = () => pool;


const closePool = async () => { pool.end(); }


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