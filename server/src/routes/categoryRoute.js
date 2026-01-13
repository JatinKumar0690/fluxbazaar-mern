const express = require("express");
const {createCategory, getAllcategories} = require("../controllers/categoryControllers.js");
const {protect} = require("../middleware/authMiddleware.js");
const {isAdmin}  = require("../middleware/adminMiddleware.js");



const router = express.Router();
//Here get routes

router.get("/", getAllcategories);

//Here post routes
router.post("/", protect, isAdmin, createCategory);

module.exports = router;