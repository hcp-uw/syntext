const fs = require('fs');

const { toAscii } = require('../db/betweenASCIIValues.js')

const directoryPath = './server/example_data/snippets'

const processSnippet = (dirPath) => {
    
    const getType = (filePath) => {
        const temp = filePath.split('/') // ['server', 'example_data', 'snippets', 'FOR_6.txt']
        return temp[temp.length - 1].split('_')[0]; //['FOR', '6.txt']
    }

    const getID = (filePath) => {
        const type = getType(filePath)

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
            case "PRINT":
                id = `3${num}` 
                break;

            case "WHILE":
                id = `4${num}` 
                break;
        }
        return Number(id.replace('.txt', ''));
    }


    const getLength = (fileData) => {
    const len = fileData.length
    if (len <= 3) return "SHORT";
    if (len <= 7) return "MEDIUM";
    else return "LONG";
    }

    const fileNames = [];

    fs.readdirSync(directoryPath).forEach(file => {
        const path = `${directoryPath}/${file}`
        if (fs.statSync(path).isFile()) fileNames.push(path);
    })

    const data = []

    fileNames.forEach((filePath) => {
        data.push({
            fileData: fs.readFileSync(filePath, {encoding:'utf8', flag:'r'})
            .replaceAll('\r', '')
            .split('\n'),
            filePath: filePath
        })
    })

    const pData = data.map(({ fileData, filePath }) => {
        return {
            id: getID(filePath),
            type: getType(filePath),
            length: getLength(fileData),
            data: fileData.map(line => toAscii(line))
        }
    });

    return pData
}

console.log(processSnippet(directoryPath))

module.exports = { processSnippet }
