import express from 'express';
import dotenv from 'dotenv';
import serverConfig from './api/src/config/server.js'; 
import videoRoute from './api/src/routes/videos/routeVideos.js';
import userroute from './api/src/routes/usuarios/userroute.js';
import cors from 'cors';



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/videos', videoRoute);
app.use('/usuarios', userroute);

app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Servidor rodando em http://${serverConfig.host}:${serverConfig.port} no dia ${serverConfig.dateTime}`);
});