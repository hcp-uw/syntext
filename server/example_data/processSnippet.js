const fs = require('fs');

// const directoryPath = './server/example_data/snippets'

const processSnippet = (dirPath) => {
    
    const getType = (filePath) => {
        const temp = filePath.split('/') // ['server', 'example_data', 'snippets', 'FOR_6.txt']
        return temp[temp.length - 1].split('_')[0]; //['FOR', '6.txt']
    }

    const getID = (filePath) => {
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
        }
        
        return Number(id.replace('.txt', ''));
    }


    const getLength = (fileData) => {
    const len = fileData.length
    if (len <= 6) return "SHORT";
    if (len <= 10) return "MEDIUM";
    else return "LONG";
    }

    const fileNames = [];

    fs.readdirSync(dirPath).forEach(file => {
        const path = `${dirPath}/${file}`
        if (fs.statSync(path).isFile()) fileNames.push(path);
    })

    const data = []

    fileNames.forEach((filePath) => {
        data.push({
            fileData: fs.readFileSync(filePath, {encoding:'utf8', flag:'r'})
            .replaceAll('\r', '')
            .split('\n')
            .map(line => line.trimEnd()),
            filePath: filePath
        })
    })

    const pData = data.map(({ fileData, filePath }) => {
        return {
            id: getID(filePath),
            type: getType(filePath),
            length: getLength(fileData),
            data: fileData
        }
    });

    return pData
}

console.log(processSnippet('./example_data/snippets'))
;

//console.log(processSnippet(directoryPath))

module.exports = { processSnippet }
