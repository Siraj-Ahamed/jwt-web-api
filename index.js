const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./userRouter.js");

dotenv.config();

mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => {
        console.log("MongoDB is connected");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use("/api", userRouter);
