import Product from "../models/product.js";

export const existProduct = async (id) => {
    const productExist = await Product.findById(id);
    if(!productExist){
        throw new Error(`This product isn't exist`);
    }
}