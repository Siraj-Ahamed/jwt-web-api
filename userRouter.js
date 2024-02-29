const express = require("express");
const router = express.Router();
const User = require("./userSchema.js");
const bcryptjs = require("bcryptjs");

router.get("/testing", (req, res) => {
    res.send("Hi I am from Regiser");
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // const user = new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    // });

    try {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json("Email already exist");
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log(hashedPassword);
        const user = new User({
            username,
            email,
            password:hashedPassword,
        });
        console.log(user);
        const data = await user.save();
        res.json(data);
    } catch (error) {}

    // res.json(req.body);
});

module.exports = router;
