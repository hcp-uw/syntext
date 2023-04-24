const GameDBClient = require('../db/game-db') 
const gameRouter = require('express').Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

gameRouter.post('/create', jsonParser, async (req, res) => {
    const {id, type, length, data} = req.body;
    const gameObject = {
        userID: userID,
        snippet_id:snippet_id,
        total_time : total_time,
        total_characters: total_characters, 
        wpm_data: wpm_data,
        wpm_avg: wpm_avg,
        accuracy: accuracy,
        num_mistakes: num_mistakes,
    }

    try {
        await GameDBClient.createEntry(gameObject, GameDBClient.getPool());
        res.status(201).send({ success: true }); //--> Idk what this does
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
