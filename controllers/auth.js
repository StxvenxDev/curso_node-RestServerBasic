import User from "../models/User.js";
import bcryptjs from "bcryptjs"
import generarjwt from "../helpers/generate-jwt.js";
import verify from "../helpers/google-verify.js";
import { json } from "express";

const login = async(req,res) => {

    const {email,password} = req.body;

    try{

        //verificar correo
        const user = await User.findOne({email});

        console.log(email,password);
        if(!user){
            return res.status(400).json({msg : 'Este usuario no existe'});
        }
        //verificar estado
        if(!user.estate){
            return res.status(400).json({msg: 'Este usuario esta desactivado en el sistema'});
        }
        //verificar contraseña
        const validatePass = bcryptjs.compareSync(password,user.password);
        if(!validatePass){
            return res.status(400).json({msg: 'contraseña incorreta'});
        }

        //crear jwt
        const token = await generarjwt(user.id);

        res.json({
            user,
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).json({msg : 'Comuniquese con el admin'})
    }
}


const googleSignIn = async (req,res) =>{
    const {id_token} = req.body;

    try {

        const {name,email,picture} = await verify(id_token);

        console.log(name);
        
        let user = await User.findOne({email});

        if(!user){
            const data = {
                name,
                password : ':P',
                email,
                img: picture,
                google : true
            }
            user = new User(data);
            await user.save();
        }

        if(!user.estate){
            res.status(400).json({msg : 'Usuario desactivado'});
        }
        
        //crear jwt
        const token = await generarjwt(user.id);
        
        res.json({
            token,
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:'El token no se pudo verificar',
            ok: false
        });
    }

}

export {
    login,
    googleSignIn
}
