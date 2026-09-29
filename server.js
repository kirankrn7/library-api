const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authorRoutes = require("./routes/authors");
const bookRoutes = require("./routes/books");
const memberRoutes = require("./routes/members");

const app = express();

app.use(express.json());

app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

app.get("/", (req, res) => {
    res.json({ message: "Library API is running" });
});