import { request, response } from "express";
import Product from "../models/product.js";

export const createProduct = async (req = request, res = response) => {
    try {
        const { name, category, description, user } = req.body;
        const data = {
            name,
            category,
            description,
            user: req.user._id
        }
        const product = new Product(data);
        product.save();
        res.status(201).json({
            product
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'error'
        })
    }
}

export const getProducts = async (req = request, res = response) => {
    try {
        const { limit = 5, since } = req.query;
        const [products, total] = await Promise.all([
            Product.find({ state: true })
                .skip(Number(since))
                .limit(Number(limit))
                .populate('user', 'name')
                .populate('category', 'name'),
            Product.countDocuments({ state: true })
        ]);

        res.status(200).json({
            total,
            products
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Error'
        })
    }
}

export const getProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate('user')
            .populate('category');
        res.json({
            product
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'error'
        })
    }
}
export const updateProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, category, description, disponible } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, category, description, disponible });
        res.status(201).json({
            product
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server Failed'
        });
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id,{state : false});
        res.status(200).json({
            product
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server Failed'
        });
    }
}

