import { Router } from "express";
import {userGet,userPut,userPost,userPatch,userDelete} from "../controllers/user.js";
import { check } from "express-validator";
import validateForm from "../middlewares/validateForm.js";
import {esRolValidate,esEmailValidate, esUserValidate} from "../helpers/db-validators.js"

const router = Router();

router.get('/', userGet);

router.post('/',[
    check('email','Esto no parece ser un correo').isEmail().custom(esEmailValidate),
    check('password','El minimo de caracteres es de 6').isLength({ min : 6}),
    check('name','El nombre es obligatorio').notEmpty(),
    //check('role','Este rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRolValidate),
    validateForm
] ,userPost);

router.put('/:id', [
    check('id','Este id no es valido').isMongoId(),
    check('id').custom(esUserValidate),
    check('role').custom(esRolValidate),
    validateForm
], userPut);

router.patch('/', userPatch);

router.delete('/:id',[
    check('id','Este id no es valido').isMongoId(),
    check('id').custom(esUserValidate),
    validateForm
],userDelete);


export default router