
import { check } from "express-validator";
import {login,googleSignIn} from "../controllers/auth.js";
import { Router } from "express";
import validateForm from "../middlewares/validateForm.js"

const authRoutes = Router();

authRoutes.post('/login', [
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').notEmpty(),
    validateForm
],login);

authRoutes.post('/google', [
    check('id_token','Google token es necesario').not().isEmpty(),
    validateForm
],googleSignIn);

export default authRoutes