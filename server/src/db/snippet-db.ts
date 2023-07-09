// get the client
import mysql from 'mysql2'
import * as config from '../utils/config.js'
import { toAscii, toChar } from './betweenASCIIValues'
import { pool } from './pool.js'
import { SnippetLength, SnippetType, Snippet } from '../types.js'
import { Connection } from 'mysql2/typings/mysql/lib/Connection.js'

const missingRequiredParams = (name: string, obj: any) => {
  return { success: false, error: `missing required params in ${name}: ${obj}` }
}

interface SnippetDBResultLine<T> extends Snippet {
  line_text: T
}

export const getSnippetByLengthAndType = async (
  length: SnippetLength,
  type: SnippetType
): Promise<Array<Snippet> | unknown> => {
  const result = await getSnippetByType(type);
  return Array.isArray(result)
    ? result.filter(snippet => snippet.length === length)
    : result;
};

export const getSnippetByType = async (type: SnippetType): Promise<Array<Snippet> | unknown> => {
  try {
    const query = `
      SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text
      FROM snippet_records AS rec, snippet_data AS data 
      WHERE rec.id = data.id AND 
      rec.snippet_type = ? 
      ORDER BY rec.id, data.line_index ASC;
    `

    // FIXME
    const rawResult: any = await pool.query(query, [type])

    if (rawResult[0].length === 0) return []
    
    const result = rawResult.map((line: any) => 
      ({ ...line, line_text: JSON.parse(line.line_text)}))

    const charData: SnippetDBResultLine<string>[] = result.map(
      (line_data: SnippetDBResultLine<number[]>) => ({
        ...line_data,
        line_text: toChar(line_data.line_text).join('')
    }));

    let intermediateResult: Record<number, Snippet> = {}

    charData.forEach((line: SnippetDBResultLine<string>) => {
      if (!intermediateResult[line.id]) {
        intermediateResult[line.id] = {
          id: line.id,
          length: line.length,
          type: line.type,
          data: [line.line_text]
        }
      } else {
        intermediateResult[line.id].data.push(line.line_text)  
      }
    })

    let processedResult: Array<Snippet> = []
    
    for (const id in intermediateResult) {
      processedResult.push(intermediateResult[id])
    }

    return processedResult
  } catch (error) {
    console.error(error)
    return error
  }
}

export const getSnippetByLength = async (length: SnippetLength): Promise<Array<Snippet> | unknown> => {
  try {
    const query = `
      SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text 
      FROM snippet_records rec INNER JOIN snippet_data data 
      ON rec.id = data.id 
      WHERE rec.snippet_length = ? 
      ORDER BY data.line_index ASC;
    `
    // FIXME    
    const result: any = await pool.query(query, [length])
    const characterConvertedData: Array<{
      id: number, 
      snippet_type: SnippetType, 
      snippet_length: SnippetLength, 
      line_text: string
    }> = result[0].map((line_data: any) => { //FIXME
      return {
        ...line_data,
        line_text: toChar(JSON.parse(line_data.line_text)).join('')
      }
    })

    // same here as above, might need to change to HashMap
    let intermediateResult: any = {}
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
          data: (intermediateResult[line.id].data += '\n' + line.line_text)
        }
      }
    })

    let processedResult: Array<Snippet> = []
    Object.keys(intermediateResult).forEach(id => {
      const d = intermediateResult[id].data
      processedResult.push({ ...intermediateResult[id], data: d.split('\n') })
    })
    return processedResult
  } catch (error) {
    console.error(error)
    return error
  } 
}

export const createSnippet = async (snippet: Snippet): Promise<{ 
  success: boolean,
  created?: { id: number, length: SnippetLength, type: SnippetType },
  error?: any
}> => {
  const { id, type, length, data } = snippet

  let connection
  try {
    connection = await pool.getConnection()
    const recordQuery =
      'INSERT INTO snippet_records (id, snippet_type, snippet_length) VALUES (?, ?, ?);'
    await connection.query(recordQuery, [id, type, length])
    const preparedValues = []
    const insertQuery =
      "INSERT INTO snippet_data (id, line_index, line_text) VALUES (?, ?, '[?]');"
    let index = 0
    for (const line of data) {
      preparedValues[index] = { id: id, i: index, d: toAscii(line) }
      index++
    }

    index = 0
    let values
    for (const values of preparedValues) {
      await connection.query(insertQuery, [values.id, values.i, values.d])
      index++
    }

    return {
      success: true,
      created: { id, type, length }
    }
  } catch (error) {
    console.error(error)
    return { error: error, success: false }
  } 
}

export const deleteSnippetByID = async (id: number): Promise<{
  success: boolean,
  error?: unknown 
}> => {
  if (!id) return missingRequiredParams('id', id)
  let connection
  try {
    connection = await pool.getConnection()
    if (connection !instanceof Connection)
      return { success: false }
    const query1 = 'DELETE FROM snippet_records WHERE id = ?'
    const query2 = 'DELETE FROM snippet_data WHERE id = ?'
    await connection.beginTransaction()
    await connection.query(query1, [id])
    await connection.query(query2, [id])
    await connection.commit()
    return { success: true }
  } catch (error) {
    console.error(error)
    if (connection instanceof Connection) 
      await connection.rollback()
    return { error: error, success: false }
  } finally {
    if (connection instanceof Connection)
      await connection.release()
  }
}



export const getSnippetByID = async (id: number): Promise<Snippet | unknown> => {

  const query = `
            SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text 
            FROM snippet_records rec, snippet_data data 
            WHERE rec.id = ? AND 
            rec.id = data.id 
            ORDER BY data.line_index ASC;
    `
  try {
    const data: any = await pool.query(query, [id])

    const result: Array<{
      id: number, 
      snippet_type: SnippetType, 
      snippet_length: SnippetLength, 
      line_text: string
    }> = data[0].map((line_data: any) => {
      return {
        ...line_data,
        line_text: toChar(JSON.parse(line_data.line_text)).join('')
      }
    })

    let type: SnippetType = result[0].snippet_type
    let length: SnippetLength = result[0].snippet_length
    const processedSnippetText: Array<string> = result.map(line => line.line_text)

    const processedResult: Snippet = {
      id: id,
      type: type,
      length: length,
      data: processedSnippetText
    }

    return processedResult
  } catch (error) {
    return {}
    console.error(error)
    return error
  } 
}

