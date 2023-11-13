import {request, response} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const userGet = async (req,res) => {
    const {limit = 5, since} = req.query;
/*     const usuarios = await User.find()
    .skip(Number(since))
    .limit(Number(limit)); */
    
    const [users, total] = await Promise.all([
        User.find({estate : true})
        .skip(Number(since))
        .limit(Number(limit)),
        User.countDocuments({estate:true})
    ]);

    res.json({
        total,
        users  
    });
};

const userPost = async (req,res)=>{

    const {name,password,email,role} = req.body;

    const user = new User({name,password,email,role});

    const salt = bcrypt.genSaltSync(10);

    user.password = bcrypt.hashSync(password,salt);

    await user.save();


    res.json({
        msg : "post api - controllers",
        user
    });

};

const userPut = async (req,res)=>{
    const {id} = req.params;
    const {_id, email, google, password, ...resto} = req.body;


    if(password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password,salt);
    }

    const usuario = await User.findByIdAndUpdate(id , resto);

    res.json({
        msg : "put api - controllers",
        usuario
    });
};

const userPatch = (req,res)=>{
    res.json({
        msg : "patch api - controllers"
    });
};

const userDelete = async (req,res) => {
    const {id} = req.params;
    const usuario = await User.findByIdAndUpdate(id,{estate : false});
    const uid = req.uid;
    res.json(
        ({usuario,uid})
    );
};

export {
    userDelete,
    userGet,
    userPatch,
    userPost,
    userPut
}