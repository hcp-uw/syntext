const GameDBClient = require('../db/game-db') 
const gameRouter = require('express').Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

gameRouter.post('/create', jsonParser, async (req, res) => {
    const {userID, snippet_id,total_time,total_characters, wpm_data, wpm_avg, accuracy, num_mistakes} = req.body;
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
        await GameDBClient.createGameEntry(gameObject, GameDBClient.getPool());
        res.status(201).send({ success: true });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

gameRouter.get('/get/game', jsonParser, async (req, res) => {
    const {username} = req.body;
    const userID = await getUserID (username);
    try {
        const {
            total_time,
            total_characters,
            wpm_data,
            wpm_avg,
            accuracy,
            num_mistakes,
        } = await GameDBClient.getGameEntry(userID);
        res.status(201).send({ success: true, 
            total_time: total_time, 
            total_characters: total_characters,
            wpm_data: wpm_data,
            wpm_avg: wpm_avg,
            accuracy: accuracy,
            num_mistakes: num_mistakes});
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});   

//Add in more about what frontend needs 

