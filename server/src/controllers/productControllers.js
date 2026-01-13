const Category = require("../models/Category.js");
const Product = require("../models/Product.js");


const createProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock, images} = req.body;
    if(!name || !description || price == null || !category) {
        return res.status(400).json({
            success: false,
            message: "Please provide all product information"
        });
    }
    const product = await Product.create ({
        name,
        description,
        price,
        category,
        stock : stock || 0,
        images: images || [],
        createdBy: req.user._id,
    });
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
    });

    } catch (error) {
        console.error("create product error", error.message);
         res.status(500).json({
            success: false,
            message: "Server error while creatin the product"
        });
    }
};

const getAllproducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 12;
        const skip = (page - 1) * limit;
        const query = {} 
        if(req.query.keyword) {
            query.name = {
                $regex: req.query.keyword,
                $options: "i", //It is case-insensitive
            };
        }
        if(req.query.category) {
            query.category = req.query.category;
        }
        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        res.status(200).json({
            success: true,
            count: products.length,
            totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            products
        });
    } catch (error) {
        console.error("Get products error", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while fetching products"
        });
    }
}

const getSingleproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error("Get single product error", error.message);
        res.status(400).json({
            success: false,
            message: "Invalid product ID"
        });
    }
};


const getProductsByCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug });
        if(!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        //Finding product with matching category name..........
        const products = await Product.find({category: category.name}).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            category: category.name,
            count: products.length,
            products
        });

    } catch (error) {
        console.error("Get product by category error", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while fetching the products by category"
        });
    }
};


module.exports = { createProduct, getAllproducts, getSingleproduct, getProductsByCategory};