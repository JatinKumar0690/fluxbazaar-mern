const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} = require("../controllers/cartControllers.js");

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/", protect, updateCartQuantity);
router.delete("/:productId", protect, removeFromCart);

module.exports = router;
