const axios = require("axios");

const Product = require("../models/Product.js");
const User = require("../models/User.js");

const seedProducts = async (req, res) => {
    try {
        const {data} = await axios.get(
            "https://fakestoreapi.com/products"
        )
        const admin = await User.findOne({role: "admin"}) || await User.findOne()
        if(!admin) {
            return res.status(400).json({
                success: false,
                message: "Please create one user in the DB first"
            });
        }
        await Product.deleteMany();
        const products = data.map((item) => ({
            name: item.title,
            description: item.description,
            price: Math.round(item.price * 100),
            category: item.category,
            images: [
                item.image,
                `https://source.unsplash.com/600x600/?${item.category}`,
                `https://source.unsplash.com/600x600/?product`,
                `https://source.unsplash.com/600x600/?shopping`,
            ],
            stock: 10,
            createdBy: admin._id,
        }))
        await Product.insertMany(products);
        res.status(201).json({
            success: true,
            message: "Product seeded successfully",
            count: products.length,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Products seeding failed"
        });
    }   
}




module.exports = {seedProducts};