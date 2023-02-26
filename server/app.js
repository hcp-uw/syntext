const express = require('express')
const readSnippetRouter = require('./controllers/readSnippets')
const editSnippetRouter = require('./controllers/editSnippets')

// const serverURL = 'http://localhost:3001'
// const routerURL = '/api/read'
// const endpointURL = '/get/length'
// const parameterURL = '?length=LONG'

const app = express()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/api/read', readSnippetRouter)
app.use('/api/edit', editSnippetRouter)


module.exports = app;

