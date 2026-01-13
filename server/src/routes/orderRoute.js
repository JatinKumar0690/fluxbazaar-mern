const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderControllers.js");

const { protect } = require("../middleware/authMiddleware.js");
const { isAdmin } = require("../middleware/adminMiddleware.js");

const router = express.Router();
//Admin route will come here
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

//Get request Here /my will come first before /:id
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getSingleOrder);

//Post request Here
router.post("/", protect, placeOrder);

module.exports = router;
