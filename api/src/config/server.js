// server.js
const dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

const serverConfig = {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.PORT || 3333,
    dateTime: dateTime,
  };
  
export default serverConfig;
  