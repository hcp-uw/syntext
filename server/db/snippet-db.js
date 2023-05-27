// get the client
const mysql = require('mysql2');
const config = require('../utils/config.js')
const {toAscii, toChar} = require('./betweenASCIIValues')
const { pool } = require('./pool.js')


const missingRequiredParams = (name, obj) => {
    return {success: false, error: `missing required params in ${name}: ${obj}`};
}

const getSnippetByLengthAndType = async (length, type) => {
    const result = await getSnippetByType(type)
    return result.filter(snippet => snippet.length === length)
}

const getSnippetByType = async (type) => {
    if (!type || typeof type !== "string") 
        return missingRequiredParams("type", type);
        let connection;
    try {
        connection = await pool.getConnection();
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
    } finally {
        await connection.release();
    } 
};


const createSnippet = async (snippet) => {

    const { id, type, length, data } = snippet;

    if (!(id && type && length && data)) 
        return missingRequiredParams("snippet", snippet);
    let connection;
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

        index = 0;
        let values;
        for (const values of preparedValues) { 
            await connection.query(insertQuery, [values.id, values.i, values.d]);
            index++;
        }

        return {
            success: true,
            created: {id, type, length}
        };
    } catch (error) {
        console.error(error);
        return { ...error, success: false };
    } finally {
        await connection.release();
    } 
};

const deleteSnippetByID = async (id) => {
    if (!id) return missingRequiredParams("id", id);
    let connection;
    try {
        connection = await pool.getConnection();
        const query1 = 'DELETE FROM snippet_records WHERE id = ?';
        const query2 = 'DELETE FROM snippet_data WHERE id = ?';
        await connection.beginTransaction();
        await connection.query(query1, [id]);
        await connection.query(query2, [id]);
        await connection.commit();
        return { success: true }
    } catch (error) {
        console.error(error);
        await connection.rollback();
        return {...error, success: false};
    }  finally {
        await connection.release();
    }
};

const getSnippetByLength = async (length) => {
    if (!length) return missingRequiredParams("length", length);
    connection = await pool.getConnection();
    try {
        connection = await pool.getConnection();
        const query = `
            SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text 
            FROM snippet_records rec INNER JOIN snippet_data data 
            ON rec.id = data.id 
            WHERE rec.snippet_length = ? 
            ORDER BY data.line_index ASC;
        `;
        const result = await connection.query(query, [length]);
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
    } finally {
        await connection.release();
    }
};


const getSnippetByID = async (id) => {
    if (!id) return missingRequiredParams("id", id);
    
    const query = `
            SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text 
            FROM snippet_records rec, snippet_data data 
            WHERE rec.id = ? AND 
            rec.id = data.id 
            ORDER BY data.line_index ASC;
    `;
    let connection;
    try {
        connection = await pool.getConnection();
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
        await connection.release();
    }
};




module.exports = {
    getSnippetByType, 
    getSnippetByLength, 
    getSnippetByID, 
    createSnippet, 
    deleteSnippetByID,
    getSnippetByLengthAndType,
}