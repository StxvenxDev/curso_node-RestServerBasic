import { Router } from "express";
import {userGet,userPut,userPost,userPatch,userDelete} from "../controllers/user.js";
import { check } from "express-validator";
import {esRolValidate,esEmailValidate, esUserValidate} from "../helpers/db-validators.js"

import validateJWT from "../middlewares/validatejwt.js";
import validateForm from "../middlewares/validateForm.js";
import {adminRole,tieneRole} from "../middlewares/validate-roles.js";

const userRouter = Router();

userRouter.get('/', userGet);

userRouter.post('/',[
    check('email','Esto no parece ser un correo').isEmail().custom(esEmailValidate),
    check('password','El minimo de caracteres es de 6').isLength({ min : 6}),
    check('name','El nombre es obligatorio').notEmpty(),
    //check('role','Este rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRolValidate),
    validateForm
] ,userPost);

userRouter.put('/:id', [
    check('id','Este id no es valido').isMongoId(),
    check('id').custom(esUserValidate),
    check('role').custom(esRolValidate),
    validateForm
], userPut);

userRouter.patch('/', userPatch);

userRouter.delete('/:id',[
    validateJWT,
    //adminRole,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id','Este id no es valido').isMongoId(),
    check('id').custom(esUserValidate),
    validateForm
],userDelete);


export default userRouter