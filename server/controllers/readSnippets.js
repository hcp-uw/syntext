const readSnippetRouter = require('express').Router()
const SnippetDBClient = require('../db/db')


readSnippetRouter.get('/get/length', (req, res) => {
    SnippetDBClient.getSnippetByLength(req.query.length)
    .then(result => res.send(result));
})

readSnippetRouter.get('/get/lengthandtype', (req, res) => {
    SnippetDBClient.getSnippetByLengthAndType(req.query.length, req.query.type)
    .then(result => res.send(result));
})

/*
unprocessed result : [
  {
    id: int,
    snippet_type: string,
    snippet_length: string,
    line_index: int,
    line_text: string
  }
]
*/

readSnippetRouter.get('/get/type', (req, res) => {
    SnippetDBClient.getSnippetByType(req.query.type)
    .then(result => res.json(result))
})

readSnippetRouter.get('/get/id', (req, res) => {
    SnippetDBClient.getSnippetByID(req.query.id)
    .then(result =>{
        let id;
        let type;
        let length;
        //console.log('unprocessed result', result)
        const processedSnippetData = result.map((line) => {
            id = line.id;
            type = line.snippet_type;
            length = line.snippet_length;
            return line.line_text;
        })

        const intermediateResult = {
            id: id,
            type: type,
            length: length,
            data: processedSnippetData
        }
        console.log('got snippet with id: ', id)
        res.json(intermediateResult);
        
    })
})

module.exports = readSnippetRouter
