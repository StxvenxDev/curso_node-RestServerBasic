
import express from 'express';
import 'dotenv/config';
import './models/server.js'
import { Server } from './models/server.js';


const server = new Server();

server.listen();

/* const app = express();
const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Hola mundo')
})

app.listen(port,()=>{
    console.log('Servidor corriendo en el puerto', port);
}) */

