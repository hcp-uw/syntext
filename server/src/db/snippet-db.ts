// get the client
import mysql from 'mysql2'
import * as config from '../utils/config'
import { toAscii, toChar } from './betweenASCIIValues'
import { pool } from './pool'
import { SnippetLength, SnippetType, Snippet, Result } from '../types'


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
): Result<Array<Snippet>> => {
  const snipetsOfType = await getSnippetByType(type);

  if (!snipetsOfType.success || !snipetsOfType.result)
    return { success: false, error: snipetsOfType.error }

  const snippets: Array<Snippet> = snipetsOfType
    .result
    .filter(snippet => snippet.length === length)
  
  return { result: snippets, success: true }
};

export const getSnippetByType = async (type: SnippetType): Result<Array<Snippet>> => {
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

    if (rawResult[0].length === 0)
      return {
        success: true,
        result: []
      }
    
    const result = rawResult[0].map((line: any) => 
      ({ ...line, line_text: JSON.parse(line.line_text)}))

    const snippets: Array<Snippet> = convertDBResultToSnippet(result)

    return { result: snippets, success: true }
    
  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  }
}

export const getSnippetByLength = async (length: SnippetLength): Result<Array<Snippet>> => {
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

    if (rawResult[0].length === 0)
      return {
        success: true,
        result: []
      }
    
    const result = rawResult[0].map((line: any) => 
      ({ ...line, line_text: JSON.parse(line.line_text)}))

    const snippets: Array<Snippet> = convertDBResultToSnippet(result)

    return { result: snippets, success: true }

  } catch (error) {
    console.error(error)
    return { success: false, error: error }
  } 
}

export const createSnippet = async (snippet: Snippet): Result<Snippet> => {
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
      result: snippet
    }

  } catch (error) {
    console.error(error)
    return { error: error, success: false }
  } 
}

export const deleteSnippetByID = async (id: number): Result<undefined> => {
  try {
    const query1 = 'DELETE FROM snippet_records WHERE id = ?'
    const query2 = 'DELETE FROM snippet_data WHERE id = ?'
    await pool.query(query1, [id])
    await pool.query(query2, [id])

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: error, success: false }
  }
}



export const getSnippetByID = async (id: number): Result<Snippet> => {

  const query = `
            SELECT rec.id, rec.snippet_type, rec.snippet_length, data.line_index, data.line_text 
            FROM snippet_records rec, snippet_data data 
            WHERE rec.id = ? AND 
            rec.id = data.id 
            ORDER BY data.line_index ASC;
    `
  try {
    const rawResult: any = await pool.query(query, [id])


    if (rawResult[0].length === 0) 
      return {
        success: false,
        error: `snippet with id ${id} not found`
      }

    const result = rawResult[0].map((line: any) => 
      ({ ...line, line_text: JSON.parse(line.line_text)}))

    let processedResult: Array<Snippet> = convertDBResultToSnippet(result)

    
    return {
      success: true,
      result: processedResult[0]
    }

  } catch (error) {
    console.error(error)
    return { error: error, success: false }
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