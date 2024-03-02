import express from 'express';
import dotenv from 'dotenv';
import testeRoute from './api/src/routes/testeroute.js';



dotenv.config();
const app = express();
app.use(express.json());

app.use('/users', testeRoute);

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
});