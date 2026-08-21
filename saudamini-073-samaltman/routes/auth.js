const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("../config/passport");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (request, response) => {
    try {
        const { username, email, password } = request.body;

        if (!username || !email || !password) {
            return response.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return response.status(400).json({
                message: "Username or email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        response.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

router.post("/login", passport.authenticate("local"), (request, response) => {
    response.status(200).json({
        message: "Login successful",
        user: {
            id: request.user._id,
            username: request.user.username,
            email: request.user.email
        }
    });
});

router.get("/logout", (request, response) => {
    request.logout((error) => {
        if (error) {
            return response.status(500).json({
                message: error.message
            });
        }

        response.status(200).json({
            message: "Logout successful"
        });
    });
});


module.exports = router;