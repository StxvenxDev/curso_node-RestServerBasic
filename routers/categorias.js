import { Router } from "express";
import { check } from "express-validator";
import validateJWT from "../middlewares/validatejwt.js";
import validateForm from "../middlewares/validateForm.js";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/category.js";
import { existCategory } from "../middlewares/validate-category.js";
import { adminRole } from "../middlewares/validate-roles.js";

const categoriesRouter = Router();

// publico
categoriesRouter.get('/', getCategories);

// publico
categoriesRouter.get('/:id', [
    check('id','este id no es valido').isMongoId(),
    check('id').custom(existCategory),
    validateForm
    ], 
    getCategory);

//privado token
categoriesRouter.post('/',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    validateForm
    ],
    createCategory);

// privado token
categoriesRouter.put('/:id',[
    validateJWT,
    check('id' , 'Este id no es valido').isMongoId(),
    check('id').custom(existCategory),
    validateForm
],
updateCategory
);

//privado token admin
categoriesRouter.delete('/:id', [
    validateJWT,
    adminRole,
    check('id' , 'Este id no es valido').isMongoId(),
    check('id').custom(existCategory),
    validateForm
],
deleteCategory
);


export default categoriesRouter;