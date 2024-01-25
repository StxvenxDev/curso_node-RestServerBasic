import path from "path";
import fs from "fs"
import { response, request } from "express"
import { subirArchivo } from "../helpers/subirArchivo.js";
import User from "../models/User.js";
import Product from "../models/product.js"
import cloudinary from "cloudinary";

const cloud = cloudinary.v2;

cloud.config(process.env.CLOUDINARY_URL);

export const cargarArchivo = async (req = request, res = response) => {
    try {
      const nombre = await subirArchivo(req.files);
      res.json({
       nombre
      }); 
    } catch (msg) {
      res.status(400).json({msg})
    }
}

export const actualizarImagen = async (req = request, res = response) => {
  const { id, coleccion} = req.params;
  let modelo;

  switch (coleccion) {
    case 'users':
      modelo = await User.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg : 'No hay un usuario con ese id'
        })
      }
      break;
    
    case 'products':
      modelo = await Product.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg : 'No hay un producto con ese id'
        })
      }
      break;
    default:
      return res.status(500).json({
        msg : 'No validé esto'
      });
  }
  try {

    if(modelo.img){
      const pathImage = path.join(process.cwd(), 'uploads/', coleccion, modelo.img);
      if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage);
      }
    }

    modelo.img = await subirArchivo(req.files, undefined, coleccion);
    await modelo.save();
    res.json({ modelo });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error
    })
  }
}

export const actualizarImagenCloudinary = async (req = request, res = response) => {
  const { id, coleccion} = req.params;
  let modelo;

  switch (coleccion) {
    case 'users':
      modelo = await User.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg : 'No hay un usuario con ese id'
        })
      }
      break;
    
    case 'products':
      modelo = await Product.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg : 'No hay un producto con ese id'
        })
      }
      break;
    default:
      return res.status(500).json({
        msg : 'No validé esto'
      });
  }
  try {

    if(modelo.img){
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[nombreArr.length-1];
      const [public_id] = nombre.split('.');
      cloud.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.archivo;
    const {secure_url} = await cloud.uploader.upload(tempFilePath);

    modelo.img = secure_url;
    await modelo.save();
    res.json({ modelo });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error
    })
  }
}

export const verImagen = async (req = request, res = response) => {
  const { id, coleccion} = req.params;
  let modelo;
  const pathError = path.join(process.cwd(),'assets/','014 no-image.jpg')
  switch (coleccion) {
    case 'users':
      modelo = await User.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg : 'No hay un usuario con ese id'
        })
      }
      break;
    
    case 'products':
      modelo = await Product.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg : 'No hay un producto con ese id'
        })
      }
      break;
    default:
      return res.status(500).json({
        msg : 'No validé esto'
      });
  }
  try {
    if(modelo.img){
      const pathImage = path.join(process.cwd(), 'uploads/', coleccion, modelo.img);
      if(fs.existsSync(pathImage)){
        return res.sendFile(pathImage);
      }
    }
    return res.status(400).sendFile(pathError);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error
    })
  }
}