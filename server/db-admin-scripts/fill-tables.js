const {getSnippetData} = require('../example_data/hardcodedsnippets')
const {createSnippet, closePool} = require('../db/db')


const exampleSnippets = getSnippetData();

const fill = async (exampleData) => {
    const promises = []
    await exampleData.forEach((snippet) => {
        promises.push(createSnippet(snippet));
    });
    return Promise.all(promises);
    
}



fill(exampleSnippets)
    .then(() => console.log("filled tables"))
    .then(() => closePool())
    .then(() => console.log("pool closed"));
    


