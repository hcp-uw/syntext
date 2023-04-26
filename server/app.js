const express = require('express');
const snippetRouter = require('./controllers/snippets');
const { userRouter } = require('./controllers/users');

const cors = require('cors');
const path = require("path");
const { unknownEndpoint, errorHandler } = require('./utils/middleware');

const app = express();

const corsOptions = {
    exposedHeaders: 'Authorization',
};

// cors
app.use(cors(corsOptions));

// provides middlewares for node server to serve front-end build files
app.use(express.static(path.join(__dirname, "..", "client", "build")));

// routers
app.use('/api/snippet', snippetRouter);
app.use('/api/user', userRouter);


// test endpoint
app.get('/test', (req, res) => {res.send('hello')})

// error handling
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app;

