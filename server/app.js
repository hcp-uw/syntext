const express = require('express')
const readSnippetRouter = require('./controllers/readSnippets')
const editSnippetRouter = require('./controllers/editSnippets')
const cors = require('cors');

// const serverURL = 'http://localhost:3001'
// const routerURL = '/api/read'
// const endpointURL = '/get/length'
// const parameterURL = '?length=LONG'

const app = express()
app.use(cors());
app.use('/api/read', readSnippetRouter)
app.use('/api/edit', editSnippetRouter)

module.exports = app;

