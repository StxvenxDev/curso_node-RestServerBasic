import { Router } from "express";
import { check } from "express-validator";
import validateJWT from "../middlewares/validatejwt.js";
import validateForm from "../middlewares/validateForm.js";
import { adminRole } from "../middlewares/validate-roles.js";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.js";
import { existCategory } from "../middlewares/validate-category.js";
import { existProduct } from "../middlewares/validate-product.js";

const productRouter = Router();

productRouter.get('/', getProducts);

productRouter.get('/:id',[
    check('id','este id no es valido').isMongoId(),
    check('id').custom(existProduct)
    ],  
    getProduct
);

productRouter.post('/',[
        validateJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('category','esta categoria no es valida').isMongoId(),
        check('category','Esta categoria no existe').custom(existCategory),
        validateForm 
    ],
    createProduct
);

productRouter.put('/:id',[
        validateJWT,
        check('id').custom(existProduct),
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('category','esta categoria no es valida').isMongoId(),
        check('category','Esta categoria no existe').custom(existCategory),
        validateForm
    ],
    updateProduct
);

productRouter.delete('/:id',[
        validateJWT,
        adminRole,
        check('id').custom(existProduct),
        check('id' , 'Este id no es valido').isMongoId(),
        validateForm
    ],
    deleteProduct
);




export default productRouter;