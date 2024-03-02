import express from 'express';
import dotenv from 'dotenv';
import serverConfig from './api/src/config/server.js'; 
import testeRoute from './api/src/routes/testeroute.js';



dotenv.config();
const app = express();
app.use(express.json());

app.use('/users', testeRoute);

app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Servidor rodando em http://${serverConfig.host}:${serverConfig.port} no dia ${serverConfig.dateTime}`);
});