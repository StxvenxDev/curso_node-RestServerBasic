import { Router } from "express";
import {userGet,userPut,userPost,userPatch,userDelete} from "../controllers/user.js";

const router = Router();

router.get('/', userGet);

router.post('/', userPost);

router.put('/:id', userPut);

router.patch('/', userPatch);

router.delete('/',userDelete);


export default router