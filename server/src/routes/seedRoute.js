const express = require("express");
const {seedProducts} = require("../controllers/seedControllers.js")
const { protect } = require("../middleware/authMiddleware.js")
const { isAdmin } = require("../middleware/adminMiddleware.js")

const router = express.Router()


router.post("/products", protect, isAdmin, seedProducts);


module.exports = router;