const readSnippetRouter = require('express').Router()
const SnippetDBClient = require('../db/db')


readSnippetRouter.get('/get/length', (req, res) => {
    SnippetDBClient.getSnippetByLength(req.query.length)
    .then(result => res.send(result))
})

readSnippetRouter.get('/get/lengthandtype', (req, res) => {
    SnippetDBClient.getSnippetByLengthAndType(req.query.length, req.query.type)
    .then(result => res.send(result));
})

/*
unprocessed result [
  {
    id: 1,
    snippet_type: 'PRINT',
    snippet_length: 'SHORT',
    line_index: 0,
    line_text: 'System.out.println("goodbye world");'
  },
  {
    id: 2,
    snippet_type: 'PRINT',
    snippet_length: 'SHORT',
    line_index: 0,
    line_text: 'String myCat = "Matilda";'
  },
  {
    id: 3,
    snippet_type: 'PRINT',
    snippet_length: 'SHORT',
    line_index: 0,
    line_text: 'int sum = myCat.length() - myGod.length();'
  },
  {
    id: 2,
    snippet_type: 'PRINT',
    snippet_length: 'SHORT',
    line_index: 1,
    line_text: 'System.out.println(myCat.charAt(3));'
  },
  {
    id: 3,
    snippet_type: 'PRINT',
    snippet_length: 'SHORT',
    line_index: 1,
    line_text: 'System.out.println(sum);'
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
        //console.log('processed result', intermediateResult)
        res.json(intermediateResult);
        
    })
})

module.exports = readSnippetRouter
