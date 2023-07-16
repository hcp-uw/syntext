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
    num_mistakes: number
}

export interface User {
    userID: number,
    username: string,
    last_login: Date
}


