import express  from  'express';
import cors from 'cors';

import router from '../routers/user.js';

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        this.middlewares();

        this.routes();
    }


    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){

        this.app.use(this.userPath, router);
        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Corriendo en el puerto', this.port)
        })
    }
}

export {
    Server
}