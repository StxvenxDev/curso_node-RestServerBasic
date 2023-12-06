import Category from "../models/categories.js";


export const existCategory = async (id) => {
    const categoryExist = await Category.findById(id);
    if(!categoryExist){
        throw new Error(`This category isn't exist`);
    }
}