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

// provides middlewares for node server to serve front-end build files
app.use("/", express.static(path.join(__dirname, "..", "..", "client", "build")));

// routers
app.use('/api/snippet', snippetRouter);
app.use('/api/user', userRouter);
app.use('/api/game', gameRouter);


// test endpoint
app.get('/test', (req, res) => {res.send('hello')})

// error handling
app.use(unknownEndpoint)
app.use(errorHandler)

export default app;

