const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");
const Product = require("../models/Product.js");

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;




const seedProducts = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DB connected");

    
    await Product.deleteMany();
    console.log(" Old products removed");

   
    const { data } = await axios.get("https://fakestoreapi.com/products");

    const products = data.map((item) => ({
      name: item.title,
      description: item.description,
      price: Math.round(item.price * 80),
      category: item.category,
      stock: Math.floor(Math.random() * 30) + 5,
      images: [item.image], 
      createdBy: ADMIN_ID,
    }));

    await Product.insertMany(products);
    console.log(` ${products.length} products seeded successfully`);

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedProducts();
