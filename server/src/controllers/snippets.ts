const snippetRouter = require('express').Router()
import { Request, Response } from 'express'
import * as Snippets from '../db/snippet-db'
import bodyParser from 'body-parser'
import { Snippet, SnippetLength, SnippetType } from '../types'

const jsonParser = bodyParser.json()

const internalServerError = { success: false, error: 'Internal Server Error' }
const missingParamsError = (param: string) => ({ success: false, error: `missing param ${param}` })

snippetRouter.post('/create', jsonParser, async (req: Request, res: Response) => {
  const { id, type, length, data } = req.body

  const snippet: Snippet = {
    id: Number(id),
    type: type,
    length: length,
    data: data
  }

  try {
    const createResult = await Snippets.createSnippet(snippet)

    if (!createResult.success)
      return res
        .status(400)
        .json({ success: false, error: createResult.error })

    res.status(201).send({ success: true })
  } catch (error) {
    console.error('Error creating snippet: ', error)
    res.status(500).send(internalServerError)
  }
})

snippetRouter.delete('/remove', async (req: Request, res: Response) => {
  const id = Number(req.query.id)

  if (!id) 
    return res
      .status(400)
      .send(missingParamsError('id'))
  
  try {
    const result = await Snippets.deleteSnippetByID(id)

    if (!result.success)
      return res
        .status(404)
        .send({ success: false, error: result.error })

    return res
      .status(202)
      .send({ success: true })

  } catch (error) {
    console.error('Error deleting snippet:', error)
    res.status(500).send(internalServerError)
  }
})

snippetRouter.get('/get/length', async (req: Request, res: Response) => {
  const length: SnippetLength = req.query.length as SnippetLength

  if (!length) 
    return res
      .status(400)
      .send(missingParamsError('length'))

  try {
    const snippetQueryResult = await Snippets.getSnippetByLength(length)

    if (!snippetQueryResult.success || !snippetQueryResult.result)
      return res
        .status(404)
        .json({ success: false, error: snippetQueryResult.error })

    return res
      .status(200)
      .send({ success: true, result: snippetQueryResult.result })

  } catch (error) {
    console.error('Error retrieving snippets by length:', error)
    res.status(500).send(internalServerError)
  }
})

snippetRouter.get('/get/lengthandtype', async (req: Request, res: Response) => {
  const length = req.query.length as SnippetLength;
  const type = req.query.type as SnippetType;

  if (!length || !type)
    return res
      .status(400)
      .send({ success: false, error: missingParamsError('length, type') });
  
  try {
    const snippetQueryResult = await Snippets.getSnippetByLengthAndType(length, type);

    if (!snippetQueryResult.success || !snippetQueryResult.result) 
      return res
        .status(404)
        .send({ success: false, error: snippetQueryResult.error });
    

    return res
      .status(200)
      .send({ success: true, result: snippetQueryResult.result });
  } catch (error) {
    console.error('Error retrieving snippets by length and type:', error);
    res.status(500).send({ success: false, error: internalServerError });
  }
});


snippetRouter.get('/get/type', async (req: Request, res: Response) => {
  const type = req.query.type as SnippetType;

  if (!type)
    return res
      .status(400)
      .send({ success: false, error: missingParamsError('type') });

  try {
    const snippetQueryResult = await Snippets.getSnippetByType(type);

    if (!snippetQueryResult.success || !snippetQueryResult.result) 
      return res
        .status(404)
        .send({ success: false, error: snippetQueryResult.error });

    return res
      .status(200)
      .send({ success: true, result: snippetQueryResult.result });
  } catch (error) {
    console.error('Error retrieving snippets by type:', error);
    res.status(500).send({ success: false, error: internalServerError });
  }
});


snippetRouter.get('/get/id', async (req: Request, res: Response) => {
  const id = Number(req.query.id);

  if (!id) {
    return res.status(400).send({ success: false, error: missingParamsError });
  }

  try {
    const snippetQueryResult = await Snippets.getSnippetByID(id);

    if (!snippetQueryResult.success || !snippetQueryResult.result) {
      return res
        .status(404)
        .send({ success: false, error: `No snippet with id ${id} found.` });
    }

    return res
      .status(200)
      .json({ success: true, result: snippetQueryResult.result });
  } catch (error) {
    console.error(`Error retrieving snippet with id ${id}:`, error);
    res.status(500).json({ success: false, error: internalServerError });
  }
});


export default snippetRouter
