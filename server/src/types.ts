export type SnippetLength =  'SHORT' | 'MEDIUM' | 'LONG'

export type SnippetType = 'FOR' | 'METHOD' | 'COLLECTIONS' | 'WHILE' | 'MISC'

export interface Snippet {
    id: number, 
    type: SnippetType,
    length: SnippetLength,
    data: Array<string>
}



