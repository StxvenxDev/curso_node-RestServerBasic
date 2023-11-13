import { request, response } from "express";
import Category from "../models/categories.js";

export const getCategories = async (req = request, res = response) => {
    try {

        const {limit = 5, since} = req.query;
            const [categories, total] = await Promise.all([
                Category.find({state : true})
                .skip(Number(since))
                .limit(Number(limit))
                .populate('user'),
                Category.countDocuments({state:true})
            ]);

            res.status(200).json({
                total,
                categories  
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message : 'Error'
        })
    }
}

export const getCategory = async (req = request, res = response) =>{
    try {
        const {id} = req.params;
        const category = await Category.findById(id)
                            .populate('user');
        res.json({
            category
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message : 'error'
        })
    }
}

export const createCategory = async (req = request, res = response) => {
    try {
        const {name} = req.body;
        const categoriaDb = await Category.findOne({ name });
        console.log(name);

        if (categoriaDb) {
            return res.status(400).json({
                message: 'Esta categoria ya existe'
            });
        }

        const data = {
            name,
            user: req.user._id
        }

        const category = new Category(data);
        category.save();

        res.status(201).json({
            category
        })
    } catch (error) {
        console.log(error);
    }

}

export const updateCategory = async (req = request, res = response) => {
    const {id}  = req.params;
    const {name} = req.body;  

    const category = await Category.findByIdAndUpdate(id,{name});

    res.status(201).json({
        category
    });
}

export const deleteCategory = async (req = request, res = response) => {
    const {id}  = req.params;
    const category = await Category.findByIdAndUpdate(id,{state : false});
    res.status(201).json({
        category
    });
}