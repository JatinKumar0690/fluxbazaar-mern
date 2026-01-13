const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const {createPaymentOrder, verifyPayment} = require("../controllers/paymentControllers.js");


const router = express.Router();


router.post("/create", protect , createPaymentOrder);

router.post("/verify", protect, verifyPayment);

module.exports = router;

