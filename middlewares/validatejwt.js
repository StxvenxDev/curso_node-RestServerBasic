import jwt from "jsonwebtoken";
import { response } from "express";
import { request } from "express";
import User from "../models/User.js";


const validateJWT = async (req = request,res = response , next) => {


    try{
        const token = req.header('x-code');

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if(!token){
            return res.status(401).json({msg : 'Token no encontrado en la peticion'});
        }
        req.user = user;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({msg : 'Token invalido'});
        
    }

}

export default validateJWT