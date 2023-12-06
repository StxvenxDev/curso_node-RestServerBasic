import { response } from "express";
import {isValidObjectId} from "mongoose";
import User from "../models/User.js";
import Category from "../models/categories.js";
import Product from "../models/product.js";
const coleccionesPermitidas = [
    'categories',
    'products',
    'users',
    'rols'
]

export const buscarUsuario = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino);
    if( esMongoId ){
        const user = await User.findById(termino);
        return res.json({
            results : (user) ? user : []
        });
    }
    const regex = RegExp(termino, 'i');
    const user = await User.find({
        $or : [{name : regex}, {email : regex}]
    })
    return res.json(user);
}

export  const buscarCategoria = async (termino = '', res = response) => {
    const esMongoId = isValidObjectId(termino);
    if(esMongoId){
        const category = await Category.findById(termino);
        return res.json({
            results : (category) ? category : []
        });
    }
    const regex = RegExp(termino,'i');
    const category = await Category.find({name:regex});
    return res.json({
        results : (category) ? category : []
    });
}

export const buscarProducto = async (termino = '', res = response) =>{
    const esMongoId = isValidObjectId(termino);
    if(esMongoId){
        const product = await Product.findById(termino)
                        .populate('category','name');
        return res.json({
            results : (product) ? product : []
        });
    }
    const regex = RegExp(termino,'i');
    const product = await Product.find({
        $or : [{name:regex},{description : regex}]
    }).populate('category','name');
    return res.json({
        results : (product) ? product : []
    });
}

export const buscar = (req,res = response)  => {
    const {coleccion, termino} = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(500).json({
            message : `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }
    switch(coleccion){
        case 'users':
            buscarUsuario(termino, res);
        break;
        case 'categories':
            buscarCategoria(termino, res);
        break;
        case 'products':
            buscarProducto(termino,res);
        break;
        default:
            res.status(500).json({
                message : 'Server error'
            })
    }
}

