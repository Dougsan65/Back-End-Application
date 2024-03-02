import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.send('Hellzao World!');
});


app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
});