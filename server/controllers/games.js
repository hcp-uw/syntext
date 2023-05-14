const { getGameEntries, createGameEntry, clearGameEntries } = require('../db/game-db') 
const { verifyToken } = require('./users');
const gameRouter = require('express').Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { getUserID } = require('../db/user-db');

const jsonParser = bodyParser.json();


gameRouter.post('/create', jsonParser, async (req, res) => {
    const gameObject = extractGame(req.body);
    const token = extractToken(req);


    try {
        const decodedToken = await verifyToken(token);
        console.log(decodedToken)
        console.log(gameObject)
        if (!decodedToken.success || gameObject.userID != decodedToken.userID)
            res.status(401).send({success: false, error: 'Token unauthorized'});
        const result = await createGameEntry(gameObject);
        console.log(result)
        if (result.success)
            res.status(201).send({ success: true });
        else 
           return res.status(400).send({error: 'Bad Request: Missing data in request body'}); 

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

gameRouter.get('/games', jsonParser, async (req, res) => {
    let {userID, username} = req.body;
    if (!userID && !username) 
        return res.status(400).send({error: 'Bad Request: Missing data in request body'}); 
    
    if (!userID)
        userID = await getUserID(username);

    
    try {
        const entries = await getGameEntries(userID);
        res.status(200).send(entries);
    } catch (error) {
        res.status(500).send({error: "Internal Server Error"});
    }
});   

gameRouter.delete('/games', jsonParser, async (req, res) => {
    let {userID, username} = req.body;
    const token = extractToken(req);

    if (!userID && !username) 
        return res.status(400).send({error: 'Bad Request: Missing data in request body'}); 
    
    if (!userID)
        userID = await getUserID(username);

    const decodedToken = await verifyToken(token);
    
    if (!decodedToken.success || userID != decodedToken.userID)
        res.status(401).send({success: false, error: 'Token unauthorized'});

    try {
        const result = await clearGameEntries(userID);
        if (result.success) res.status(200).send(result);
        else res.status(400)
    } catch (error) {
        res.status(500).send({error: "Internal Server Error"});
    }
});   


const extractGame = (body) => {
    const {
        userID, 
        snippet_id,
        total_time,
        total_characters, 
        wpm_data, 
        wpm_avg, 
        accuracy, 
        num_mistakes
    } = body;

    return {
        userID: userID,
        snippet_id:snippet_id,
        total_time : total_time,
        total_characters: total_characters, 
        wpm_data: wpm_data,
        wpm_avg: wpm_avg,
        accuracy: accuracy,
        num_mistakes: num_mistakes,
    }
} 

const extractToken = (req) => {
    const tokenIndex =
    req.rawHeaders.findIndex(header => header === 'Authorization') + 1
    return req.rawHeaders[tokenIndex];
}

//Add in more about what frontend needs 

module.exports = gameRouter;