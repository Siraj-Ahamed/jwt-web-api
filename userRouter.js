const express = require("express");
const router = express.Router();
const User = require("./userSchema.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/testing", (req, res) => {
    res.send("Hi I am from Regiser");
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const emailExist = await User.findOne({ email });
        // console.log('E', emailExist);
        if (emailExist) {
            return res.status(400).json("Email already exist");
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log(hashedPassword);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        console.log(user);
        const data = await user.save();
        res.json(data);
    } catch (error) {
        res.status(400).json(error);
    }

    // res.json(req.body);
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json("Email is not found");
        }

        const validPassword = await bcryptjs.compare(
            password,
            userData.password
        );
        console.log(validPassword);
        if (!validPassword) {
            return res.status(400).json("Password not valid");
        }

        const token = jwt.sign({ email }, process.env.SECRET_KEY);

        res.header("auth", token).json({ token });
    } catch (error) {
        res.status(400).json(error);
    }
});
module.exports = router;
