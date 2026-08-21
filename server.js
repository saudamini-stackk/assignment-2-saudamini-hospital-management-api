const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const passport = require("./config/passport");

const authRoutes = require("./routes/auth");
const hospitalRoutes = require("./routes/hospitalRouter");
const cors = require("cors");

dotenv.config();

const app = express();



connectDB();


app.use(express.json());
app.use(cors());


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);


// Passport
app.use(passport.initialize());
app.use(passport.session());


// Home
app.get("/", (request, response) => {
    response.json({
        message: "Hospital Management API"
    });
});


// Authentication routes
app.use("/", authRoutes);


// Hospital routes
app.use("/hospitals", hospitalRoutes);


// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});