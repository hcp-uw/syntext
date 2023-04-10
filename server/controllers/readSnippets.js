const readSnippetRouter = require('express').Router()
const SnippetDBClient = require('../db/db')


readSnippetRouter.get('/get/length', async (req, res) => {
    try {
        const result = await SnippetDBClient.getSnippetByLength(req.query.length);
        res.send(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

readSnippetRouter.get('/get/lengthandtype', async (req, res) => {
    try {
        const result = await SnippetDBClient.getSnippetByLengthAndType(req.query.length, req.query.type);
        res.send(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

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

readSnippetRouter.get('/get/type', async (req, res) => {
    try {
        const result = await SnippetDBClient.getSnippetByType(req.query.type);
        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

readSnippetRouter.get('/get/id', async (req, res) => {
    try {
        const result = await SnippetDBClient.getSnippetByID(req.query.id);

        if (Object.keys(result).length !== 0) res.status(200).json(result);
        else res.status(404).json({Message: `No snippet with id ${req.query.id} found.`});
    } catch (error) {
        console;log("catch block")
        res.status(500).json("Internal Server Error");
    }
});


module.exports = readSnippetRouter
