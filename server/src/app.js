const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoute.js");
const productRoute = require("./routes/productRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const cartRoutes = require("./routes/cartRoute.js");
const orderRoutes = require("./routes/orderRoute.js");
const paymentRoute = require("./routes/paymentRoute.js");
const seedRoute = require("./routes/seedRoute.js");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));



app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "Backend API is running",
        success: "true"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/seed", seedRoute);

module.exports = app;