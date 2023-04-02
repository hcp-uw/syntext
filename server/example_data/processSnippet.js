const fs = require('fs');

const directoryPath = './server/example_data/snippets'




// const text = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});

const fileNames = [];

fs.readdirSync(directoryPath).forEach(file => {
    const path = `${directoryPath}/${file}`
    if (fs.statSync(path).isFile()) fileNames.push(path);
})

const data = []

fileNames.forEach((filePath) => {
    data.push(fs.readFileSync(filePath, {encoding:'utf8', flag:'r'})
        .replaceAll('\r', '')
        .split('\n')
    );
})

console.log(data);




// const snippet = {
//     id : int,
//     type : String,
//     length : String,
//     data : int[][]
// }

// const method = (textFile) => {
//     const result = Object.create(snippet)
// }


///server/example_data/processSnippet.js