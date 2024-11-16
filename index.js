import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import dbConnection from './Database/dbconfig.js';
import path from 'path'
dbConnection();
dotenv.config();
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
const corsOptions = {
    origin: 'https://movie-loom-client.onrender.com', // imp
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOptions))
app.options('*', cors());


import UserRouter from './Rourtes/UserRouter.js'
// routes
app.use('/api/auth/user', UserRouter);

export default app;
