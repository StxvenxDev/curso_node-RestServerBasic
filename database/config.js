import mongoose from 'mongoose';

const dbConnection = async () => {

    try{

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de datos cargada con exito');

    }catch(error){
        console.log(error);
        throw new Error ('No se ha podido conectar a la base de datos')
    }

}

export {
    dbConnection
}