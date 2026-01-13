const User = require("../models/User.js");
const generateToken = require("../utils/generateToken.js");

const registerUser = async (req, res) => {
   try {
    //If email or name or password is not filled by user then
     const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Provide All Login Credentials"
        });
    }
    //Checking if user already exist
    const existingUser = await User.findOne({email})
    if(existingUser) {
        return res.status(409).json({
            success: false,
            message: "User already exists"
        });
    }
    // creating User
    const user = await User.create({
        name,
        email,
        password
    })
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });

   } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({
        success: false, 
        message: "server error during registering user"
    });
   }
};

const loginUser = async (req, res) => {
    try {
        //If email and password is not filled by user then
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
       
        const user = await User.findOne({email}).select("+password");
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const token = generateToken(user._id);
        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            user: {
                name: user.name,
                id: user._id,
                token,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while logging in"
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};