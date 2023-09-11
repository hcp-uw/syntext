import { verifyAccessToken, extractToken, handleAuth } from '../utils/auth'
import { getUserID } from '../db/user-db'
import { getGameEntries, createGameEntry, clearGameEntries, getAllGames } from '../db/game-db'

import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()

import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { GameSummary, Result } from '../types'
import { getLeaderboardData } from '../db/leaderboard-db'
const gameRouter = require('express').Router()

// need to make sure userID is sent in req.body or req.query for handleAuth
gameRouter.post('/create', [jsonParser, handleAuth], async (req: Request, res: Response) => {
  const gameObject = await extractGame(req)
  if (!gameObject.success || !gameObject.result) 
    return res
      .status(400)
      .send({ success: false, error: `missing game summary field(s)` })

  try {
    const result = await createGameEntry(gameObject.result)

    if (result.success) 
      return res.status(201).send({ success: true })
    else
      return res
        .status(400)
        .send({ success: false, error: `missing game summary field(s)` })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal Server Error' })
  }
})

gameRouter.get('/games', jsonParser, async (req: Request, res: Response) => {
  let { userID } = req.query


  try {
    const entries = userID  
      ? await getGameEntries(Number(userID))
      : await getAllGames();

    if (!entries.success || !entries.result)
      res
        .status(404)
        .json({ success: false, error: entries.error })
    
    res
      .status(200)
      .send({ success: true, result: entries.result })
  } catch (error) {
    res.status(500).send({ success: false, error: 'Internal Server Error' })
  }
})

gameRouter.get('/leaderboard', jsonParser, async (req: Request, res: Response) => {
  let sort: string = req.query.sort as string
  if (!sort)
    sort = "wpm"

  if ("wpm" != sort && "time" != sort && "accuracy" != sort && "typed" != sort)
    return res
      .status(400)
      .json({ success: false, error: "Invalid sort param" })

  try {
    const entries = await getLeaderboardData(sort)

    if (!entries.success || !entries.result)
      res
        .status(404)
        .json({ success: false, error: entries.error })
    
    res
      .status(200)
      .send({ success: true, result: entries.result })
  } catch (error) {
    res.status(500).send({ success: false, error: 'Internal Server Error' })
  }
})


gameRouter.delete('/games', [jsonParser, handleAuth], async (req: Request, res: Response) => {
  let { userID } = req.query

  if (!userID)
    return res
      .status(400)
      .send({ error: 'Bad Request: Missing data in request body' })

  try {
    const result = await clearGameEntries(Number(userID))

    if (!result.success) 
      return res
        .status(400)
        .send({ success: false, error: result.error })
    
    return res
      .status(200)
      .send({ success: true })
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' })
  }
})

const extractGame = async (req: Request): Result<GameSummary> => {
  if (!req.body || !isGameSummary(req.body))
    return { 
      success: false, 
      error: 'no game summary in request body' 
    }

  const {
    userID,
    snippet_id,
    total_time,
    total_characters,
    wpm_data,
    wpm_avg,
    accuracy,
    num_mistakes
  } = req.body

  return { 
    success: true, 
    result: { ...req.body }
  }

}

function isGameSummary(obj: any): obj is GameSummary {
  return (
    typeof obj.userID === 'number' &&
    typeof obj.snippet_id === 'number' &&
    typeof obj.total_time === 'number' &&
    typeof obj.total_characters === 'number' &&
    Array.isArray(obj.wpm_data) &&
    obj.wpm_data.every((value: any) => typeof value === 'number') &&
    typeof obj.wpm_avg === 'number' &&
    typeof obj.accuracy === 'number' &&
    typeof obj.num_mistakes === 'number'
  );
}

//Add in more about what frontend needs

export default gameRouter
