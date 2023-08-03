import express, { Application } from 'express';
import snippetRouter from './controllers/snippets';
import userRouter from './controllers/users';
import gameRouter from './controllers/games';
import cors from 'cors';
import path from "path";
import { unknownEndpoint, errorHandler } from './utils/middleware';

const app: Application = express();
const corsOptions = {
    exposedHeaders: 'Authorization',
};

// cors
app.use(cors(corsOptions));


// routers
app.use('/api/snippet', snippetRouter);
app.use('/api/user', userRouter);
app.use('/api/game', gameRouter);


// test endpoint
app.get('/test', (req, res) => {res.send('hello')})

app.use(errorHandler)

const clientBuild = path.join(__dirname, "..", "..", "client", "build")

// provides middlewares for node server to serve front-end build files
app.use(express.static(clientBuild));

app.get('*', function(req, res) {
    res.sendFile('index.html', { root: clientBuild });
});

// // error handling
app.use(unknownEndpoint)



export default app;

