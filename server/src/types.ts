import { Request } from "express"

export type SnippetLength =  'SHORT' | 'MEDIUM' | 'LONG'

export type SnippetType = 'FOR' | 'METHOD' | 'COLLECTIONS' | 'WHILE' | 'MISC'

export interface Snippet {
    id: number, 
    type: SnippetType,
    length: SnippetLength,
    data: Array<string>
}

export interface GameSummary {
    userID: number,
    snippet_id: number,
    total_time: number,
    total_characters: number,
    wpm_data: Array<number>,
    wpm_avg: number,
    accuracy: number,
    num_mistakes: number,
    time_stamp?: string
}

export interface User {
    userID: number,
    username: string,
    last_login: Date,
    secret: string,
    refresh_token: string,
    hash_password: string,
    private: boolean
}

export interface SuccesfullyDecodedToken<T> { 
    result: T,
    success: boolean 
} 
  
export interface FailedDecodedToken { 
    error: unknown,
    success: boolean,
    message?: string 
}

export interface IdentifiedRequest extends Request {
    userID: number
    decodedUserID: number
}

export type Result<T> = Promise<{
    success: boolean,
    result?: T,
    error?: unknown
}>
