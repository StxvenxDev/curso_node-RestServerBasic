
import { check } from "express-validator";
import { Router } from "express";
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, verImagen } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import validateForm from "../middlewares/validateForm.js";
import { validarArchivoSubir } from "../middlewares/validar-archivo.js";

const uploadRoutes = Router();

uploadRoutes.post('/',[validarArchivoSubir],cargarArchivo);

uploadRoutes.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','El id debe ser un mongo id').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c ,['users','products'] )),
    validateForm
], actualizarImagenCloudinary)

uploadRoutes.get('/:coleccion/:id',[
    check('id','El id debe ser un mongo id').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c ,['users','products'] )),
    validateForm
], verImagen)

export default uploadRoutes