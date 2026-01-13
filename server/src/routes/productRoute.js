const express = require("express");
const {createProduct, getAllproducts, getSingleproduct, getProductsByCategory} = require("../controllers/productControllers.js");
const {protect} = require("../middleware/authMiddleware.js");
const {isAdmin}  = require("../middleware/adminMiddleware.js");

const router = express.Router();

//Public routes is here.......
router.get("/", getAllproducts);
router.get("/category/:slug", getProductsByCategory)
router.get("/:id", getSingleproduct);


//Admin route is here........
router.post("/", protect, isAdmin, createProduct);

module.exports = router;
