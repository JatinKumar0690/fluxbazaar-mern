const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");

//  helper 
const getPopulatedCart = async (userId) => {
  return await Cart.findOne({ user: userId }).populate(
    "items.product",
    "name price images"
  );
};

//  ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "ProductId required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    const populatedCart = await getPopulatedCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Added to cart",
      cart: populatedCart,
    });
  } catch (error) {
    console.error("AddToCart error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await getPopulatedCart(req.user._id);

    res.status(200).json({
      success: true,
      cart: cart || { items: [] },
    });
  } catch (error) {
    console.error("GetCart error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  UPDATE QUANTITY
const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false });

    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (index === -1) return res.status(404).json({ success: false });

    if (quantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = quantity;
    }

    await cart.save();
    const populatedCart = await getPopulatedCart(req.user._id);

    res.status(200).json({
      success: true,
      cart: populatedCart,
    });
  } catch (error) {
    console.error("UpdateCart error:", error.message);
    res.status(500).json({ success: false });
  }
};

//  REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    const populatedCart = await getPopulatedCart(req.user._id);

    res.status(200).json({
      success: true,
      cart: populatedCart,
    });
  } catch (error) {
    console.error("RemoveCart error:", error.message);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
};
