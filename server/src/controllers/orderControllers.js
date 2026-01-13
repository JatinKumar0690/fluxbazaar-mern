const Order = require("../models/Order.js");
const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");

const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user._id}).populate("items.product");
        if(!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }
        let totalAmount = 0;
        //Prepare order items
        const orderItems = cart.items.map((item) => {
            totalAmount += item.product.price * item.quantity;
            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            };
        });
        // Creating Order 
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount
        });
        for(const item of cart.items) {
            const product = await Product.findById(item.product._id)
            product.stock -= item.quantity
            await product.save()
        }
        cart.items = []
        await cart.save();
        res.status(200).json({
            success: true,
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        console.error("Place order error", error.message)
        res.status(500).json({
            success: false,
            message: "server error while placing order"
        })
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user._id})
        .populate("items.product", "name price images")
        .sort({createdAt: -1});
        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        })
    } 
    catch (error) {
        console.error("Get my order error", error.message);
        res.status(500).json({
            success: false,
            message: "server error while fetching orders"
        });
    }
}

const getSingleOrder = async (req, res) => {
    try {
         const { id } = req.params;
         const order = await Order.findById(id)
         .populate("items.product", "name price images")
         .populate("user", "name email");
         if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order doesn't exist"
            });
         }
         //Here i will do security check regarding order must be belong to logged in user
         if(order.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized for this order"
            });
         }
         res.status(200).json({
            success: true,
            order
         })
    } catch (error) {
        console.error("Get single order error", error.message);
        res.status(400).json({
            success: false,
            message: "Invalid order Id"
        })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", "name email")
        .populate("items.product", "name price")
        .sort({createdAt: -1});



        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Get all orders errors", error.message)
        res.status(500).json({
            success: false,
            message: "Server error while fetching orders"
        });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowedStatuses = ["placed", "shipped", "delivered", "cancelled"];
        if(!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }
        const order = await Order.findById(id);
        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        order.orderStatus = status;
        if(status === "delivered") {
            order.paymentStatus = "paid";
        }
        await order.save();
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });
    } catch (error) {
        console.error("Update order status error", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while updating order status"
        });
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus
}