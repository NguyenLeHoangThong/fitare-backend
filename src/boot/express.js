import express from 'express';
import http from 'http';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { router } from '../modules/index.js';

const app = express();

const server = http.createServer(app);

app.use(cors());

app.disable('x-powered-by');

app.enable('trust proxy');

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
}

app.use(bodyParser.json());

app.use('/', router);

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        error: error.message
    })
})


export default server;