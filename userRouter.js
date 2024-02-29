const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
    res.send("Hi I am from Regiser");
});

module.exports = router;
