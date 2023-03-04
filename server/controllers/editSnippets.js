const editSnippetRouter = require('express').Router()
const Snippet = require('../db/db')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

editSnippetRouter.post('/mksnippet', jsonParser, (req, res) => {
    const {id, type, length, data} = req.body;
    const snippetObject = {
        id: id,
        type: type,
        length: length,
        data: data
    }
    Snippet.createSnippet(snippetObject).then((result) => {
        (result.errno) ? res.status(400).send(result) : res.send(result)
    });
})

editSnippetRouter.delete('/delsnippet', (req, res) => {
    const id = req.query.id;
    console.log('request sent, deleted snippet with id: ', id)
    res.send(Snippet.deleteSnippetByID(id))
})

module.exports = editSnippetRouter;
