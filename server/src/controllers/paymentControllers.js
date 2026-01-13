const Razorpay = require("razorpay");
const Order = require("../models/Order.js");
const crypto = require("crypto");
const Cart = require("../models/Cart.js")

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create payment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete payment data",
      });
    }

    //  Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    //  Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Calculate total
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    //  Create Order in DB
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount,
      paymentStatus: "paid",
      orderStatus: "placed",
      paymentInfo: {
        razorpay_order_id,
        razorpay_payment_id,
      },
    });

    //  Clear cart
    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Payment verified & order placed",
      order,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


module.exports = {createPaymentOrder, verifyPayment};