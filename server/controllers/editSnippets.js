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
        (result.errno) ? 
            res.status(400).send("error creating snippet") : 
            res.send("snippet created")
    });
})

editSnippetRouter.delete('/delsnippet', (req, res) => {
    const id = req.query.id;
    res.send(Snippet.deleteSnippetByID(id)).then((result) => {
        (result.errno) ? 
            res.status(400).send("error deleting snippet") : 
            res.send("snippet deleted")
    })
})

module.exports = editSnippetRouter;
