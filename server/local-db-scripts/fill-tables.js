const {getSnippetData} = require('../example_data/hardcodedsnippets')
const {createSnippet} = require('../db/db')


const exampleSnippets = getSnippetData();

const fill = (exampleData) => {
    exampleData.forEach((snippet) => {
        createSnippet(snippet);
    })
}

fill(exampleSnippets);
console.log('filled tables');

