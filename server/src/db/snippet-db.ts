// get the client
import mysql from 'mysql2'
import * as config from '../utils/config'
import { toAscii, toChar } from './betweenASCIIValues'
import { pool } from './pool'
import { SnippetLength, SnippetType, Snippet } from '../types'


const missingRequiredParams = (name: string, obj: any) => {
  return { success: false, error: `missing required params in ${name}: ${obj}` }
}

interface SnippetDBResultLine<T> {
  id: number
  snippet_length: SnippetLength
  snippet_type: SnippetType
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
    
    const result = rawResult[0].map((line: any) => 
      ({ ...line, line_text: JSON.parse(line.line_text)}))

    const processedResult: Array<Snippet> = convertDBResultToSnippet(result)

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
    const rawResult: any = await pool.query(query, [length])

    if (rawResult[0].length === 0) return []

    const result = rawResult[0].map((line: any) => 
      ({ ...line, line_text: JSON.parse(line.line_text)}))

    let processedResult: Array<Snippet> = convertDBResultToSnippet(result)

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

  try {
    const recordQuery =
      'INSERT INTO snippet_records (id, snippet_type, snippet_length) VALUES (?, ?, ?);'

    await pool.query(recordQuery, [id, type, length])
    
    const preparedValues: Array<{id: number, i: number, d: number[]}> = []
    
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
      await pool.query(insertQuery, [values.id, values.i, values.d])
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

  try {
    const query1 = 'DELETE FROM snippet_records WHERE id = ?'
    const query2 = 'DELETE FROM snippet_data WHERE id = ?'
    await pool.query(query1, [id])
    await pool.query(query2, [id])
    await pool.commit()
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: error, success: false }
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
    const rawResult: any = await pool.query(query, [id])


    if (rawResult[0].length === 0) return {}

    const result = rawResult[0].map((line: any) => 
      ({ ...line, line_text: JSON.parse(line.line_text)}))

    let processedResult: Array<Snippet> = convertDBResultToSnippet(result)

    
    return processedResult[0]
  } catch (error) {
    console.error(error)
    return {}
  } 
}

const convertDBResultToSnippet = (result: any): Snippet[] => {
  const charData: SnippetDBResultLine<string>[] = result.map((line_data: SnippetDBResultLine<number[]>) => ({
    ...line_data,
    line_text: toChar(line_data.line_text).join('')
  }));

  let intermediateResult: Record<number, Snippet> = {};

  charData.forEach((line: SnippetDBResultLine<string>) => {
    if (!intermediateResult[line.id]) {
      intermediateResult[line.id] = {
        id: line.id,
        length: line.snippet_length,
        type: line.snippet_type,
        data: [line.line_text]
      };
    } else {
      intermediateResult[line.id].data.push(line.line_text);
    }
  });

  let processedResult: Snippet[] = [];

  for (const id in intermediateResult) {
    processedResult.push(intermediateResult[id]);
  }

  return processedResult;
};