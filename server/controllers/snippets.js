
const snippetRouter = require('express').Router();
const {
    getSnippetByType,
    getSnippetByLength,
    getSnippetByID,
    createSnippet,
    deleteSnippetByID,
    getSnippetByLengthAndType,
    closePool,
    getPool
  } = require('../db/snippet-db')

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

snippetRouter.post('/create', jsonParser, async (req, res) => {
    const { id, type, length, data } = req.body;

    if (!id || !type || !length || !data) {
        return res.status(400).send('Bad Request: Missing data in request body');
    }

    const snippetObject = {
        id: Number(id),
        type: type,
        length: length,
        data: data
    };

    try {
        await createSnippet(snippetObject, getPool());
        res.status(201).send('Snippet created');
    } catch (error) {
        console.error('Error creating snippet:', error);
        res.status(500).send('Internal Server Error');
    }
});

snippetRouter.delete('/remove', async (req, res) => {
    const id = Number(req.query.id);

    if (!id) {
        return res.status(400).send('Bad Request: Missing id parameter');
    }

    try {
        const result = await deleteSnippetByID(id);

        if (result && result.success) {
            return res.status(202).send('Snippet deleted');
        } else {
            return res.status(404).send('Not Found: Snippet not found');
        }
    } catch (error) {
        console.error('Error deleting snippet:', error);
        res.status(500).send('Internal Server Error');
    }
});

snippetRouter.get('/get/length', async (req, res) => {
    const length = req.query.length;

    if (!length) {
        return res.status(400).send('Bad Request: Missing length parameter');
    }

    try {
        const result = await getSnippetByLength(length);

        if (result.length === 0) {
            return res.status(404).send('Not Found: No snippets found with given length');
        }

        return res.send(result);
    } catch (error) {
        console.error('Error retrieving snippets by length:', error);
        res.status(500).send('Internal Server Error');
    }
});


snippetRouter.get('/get/lengthandtype', async (req, res) => {
    const length = req.query.length;
    const type = req.query.type;

    if (!length || !type) {
        return res.status(400).send('Bad Request: Missing length or type parameter');
    }

    try {
        const result = await getSnippetByLengthAndType(length, type);

        if (result.length === 0) {
            return res.status(404).send('Not Found: No snippets found with given length and type');
        }

        return res.send(result);
    } catch (error) {
        console.error('Error retrieving snippets by length and type:', error);
        res.status(500).send('Internal Server Error');
    }
});



snippetRouter.get('/get/type', async (req, res) => {
    const type = req.query.type;

    if (!type) {
        return res.status(400).send('Bad Request: Missing type parameter');
    }

    try {
        const result = await getSnippetByType(type);

        if (result.length === 0) {
            return res.status(404).send('Not Found: No snippets found with given type');
        }

        return res.json(result);
    } catch (error) {
        console.error('Error retrieving snippets by type:', error);
        res.status(500).send('Internal Server Error');
    }
});


snippetRouter.get('/get/id', async (req, res) => {
    const id = Number(req.query.id);

    if (!id) {
        return res.status(400).send('Bad Request: Missing id parameter');
    }

    try {
        const result = await getSnippetByID(id);

        if (Object.keys(result).length !== 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ Message: `No snippet with id ${id} found.` });
        }
    } catch (error) {
        console.error(`Error retrieving snippet with id ${id}:`, error);
        return res.status(500).json("Internal Server Error");
    }
});



module.exports = snippetRouter

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