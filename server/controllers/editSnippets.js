const editSnippetRouter = require('express').Router();
const Snippet = require('../db/snippet-db');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

editSnippetRouter.post('/mksnippet', jsonParser, async (req, res) => {
    const {id, type, length, data} = req.body;
    const snippetObject = {
        id: id,
        type: type,
        length: length,
        data: data
    };

    try {
        await Snippet.createSnippet(snippetObject, Snippet.getPool());
        res.status(201).send("snippet created");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

editSnippetRouter.delete('/delsnippet', async (req, res) => {
    const id = req.query.id;
    try {
        const result = await Snippet.deleteSnippetByID(id);
        res.status(202).send("snippet deleted");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


module.exports = editSnippetRouter;
