const express = require('express')
const readSnippetRouter = require('./controllers/readSnippets')
const editSnippetRouter = require('./controllers/editSnippets')
const cors = require('cors');
const { unknownEndpoint, errorHandler } = require('./utils/middleware');

const app = express();

// cors
app.use(cors());

// routers
app.use('/api/read', readSnippetRouter);
app.use('/api/edit', editSnippetRouter);


// test endpoint
app.get('/test', (req, res) => {res.send('hello')})

// error handling
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app;

