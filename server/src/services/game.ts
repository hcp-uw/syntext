import { verifyAccessToken, extractToken, handleAuth } from '../utils/auth'
import { getUserID } from '../db/user-db'
import { getGameEntries, createGameEntry, clearGameEntries, getAllGames } from '../db/game-db'

import jwt from 'jsonwebtoken'

import { GameSummary, Result } from '../types'
import { getLeaderboardData } from '../db/leaderboard-db'
import Game from './../../../client/src/Components/Game/Game';



export async function createGame(game: GameSummary): 
  Promise<boolean> 

{
  let result;
  try {
    result = await createGameEntry(game)

    if (result.error)
      throw result.error 

  } catch (error) {
    log("Error thrown in game-db", error)
    return false;
  }

  return result.success;
} 


 

export async function getGames(userID?: number): 
  Promise<Array<GameSummary>>

{
  let entries: GameSummary[] | undefined;

  try {

    entries = (userID  
      ? await getGameEntries(userID)
      : await getAllGames()).result;

  } catch (error) {
    log("Error thrown by game-db", error)
  }

  if (entries === undefined)
      return new Array<GameSummary>();

  return entries;
}



export async function getLeaderboard(sort: "wpm" | "time" | "accuracy" | "typed"): 
  Promise<GameSummary[]>

{
  let entries: GameSummary[] | undefined;
  let error: unknown;

  try {

    const result = await getLeaderboardData(sort);

    entries = result.result;
    error = result.error

    if (!entries)
      throw error

  } catch (error) {
    log("error thrown in game-db", error)
    return new Array<GameSummary>();
  }

  return entries;
}


export async function deleteGames(userID: number):
  Promise<boolean>

{
  let result;

  try {

    result = await clearGameEntries(userID);

    if (!result.success || result.error)
      throw result.error 

  } catch (error) {
    log("error thrown in game-db", error)
    return false;
  }

  return result.success;
}


function log(message: string, error: unknown) { console.log(message, error) }
