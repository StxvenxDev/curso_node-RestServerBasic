import express  from  'express';
import cors from 'cors';
import {dbConnection} from '../database/config.js'
import fileUpload from 'express-fileupload';
import userRouter from '../routers/user.js';
import authRouter from '../routers/auth.js' ;
import productRouter from '../routers/product.js';
import categoriesRouter from '../routers/categorias.js';
import  buscarRouter  from '../routers/buscar.js';
import uploadRoutes from '../routers/uploads.js';
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            user : '/api/users',
            auth : '/api/auth',
            category : '/api/categorias',
            product : '/api/product',
            buscar : '/api/buscar',
            upload : '/api/upload'
        }
        this.database();
        this.middlewares();
        this.routes();
    }

    async database(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));

        this.app.use(express.json());

        this.app.use(express.urlencoded())

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

        this.app.use(cors());
    }

    routes(){
        this.app.use(this.paths.user, userRouter);
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.category, categoriesRouter );
        this.app.use(this.paths.product, productRouter);
        this.app.use(this.paths.buscar, buscarRouter );
        this.app.use(this.paths.upload, uploadRoutes);
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