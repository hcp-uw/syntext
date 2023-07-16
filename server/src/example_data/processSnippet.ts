import { Snippet, SnippetLength, SnippetType } from '../types'
import fs from 'fs';

// const directoryPath = './server/example_data/snippets'



export const processSnippet = (dirPath: string) => {
    
    try {
        const filesInDirectory = fs.readdirSync('.');
        console.log('Files in the current directory:');
        console.log(filesInDirectory);
    } catch (err) {
        console.error('Error reading directory:', err);
    }

    const getType = (filePath: string): SnippetType => {
        const temp: Array<string> = filePath.split('/') // ['server', 'example_data', 'snippets', 'FOR_6.txt']
        return temp[temp.length - 1].split('_')[0] as SnippetType; //['FOR', '6.txt']
    }

    const getID = (filePath: string): number => {
        const type = getType(filePath).toUpperCase();
        const temp = filePath.split('/') // ['server', 'example_data', 'snippets', 'FOR_6.txt']
        const num = temp[temp.length - 1].split('_')[1];
        
        let id;
        switch (type) {
            case "FOR": 
                id = `1${num}` 
                break;
            case "METHOD":
                id = `2${num}` 
                break;
            case "COLLECTIONS":
                id = `3${num}` 
                break;

            case "WHILE":
                id = `4${num}` 
                break;
            default:
                id = `0${num}`
        }
        
        return Number(id.replace('.txt', ''));
    }


    const getLength = (fileData: Array<string>): SnippetLength => {
        const len = fileData.length
        if (len <= 6) return "SHORT";
        if (len <= 10) return "MEDIUM";
        else return "LONG";
    }

    const fileNames: Array<string> = [];

    fs.readdirSync(dirPath).forEach( (file: string): void => {
        const path = `${dirPath}/${file}`
        if (fs.statSync(path).isFile()) fileNames.push(path);
    })
    type FileObject = {fileData: Array<string>, filePath: string}
    const data: Array<FileObject> = []

    fileNames.forEach((filePath: string) => {
        data.push({
            filePath: filePath,
            fileData: fs.readFileSync(filePath, {encoding:'utf8', flag:'r'})
                .replaceAll('\r', '')
                .split('\n')
                .map((line: string): string => line.trimEnd())
        })
    })

    const pData = data.map(({ fileData, filePath }: FileObject): Snippet => {
        return {
            id: getID(filePath),
            type: getType(filePath),
            length: getLength(fileData),
            data: fileData
        } as Snippet
    });

    return pData
}

// console.log(processSnippet('./example_data/snippets'))


