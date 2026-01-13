const Category = require("../models/Category.js");

const createCategory = async (req, res) => {
    try {   
        const {name} = req.body;
        if(!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }
        const slug = name.toLowerCase().replace(/\s+/g, "-");
        const category = await Category.create ({
            name,
            slug
        });
        res.status(201).json({
            success: true,
            message: "Category created successfully"
        });

    } catch (error) {
        console.error("create category error", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while creating the category"
        });
    }
}

const getAllcategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });
    } catch (error) {
        console.error("Get all categories error", error.message)
        res.status(500).json({
            success: false,
            message: "Server error while fetching categories"
        });
    }
};

module.exports = {
    createCategory,
    getAllcategories
};