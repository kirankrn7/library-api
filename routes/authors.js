const express = require("express");
const Author = require("../models/Author");

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const author = new Author(req.body);
        const savedAuthor = await author.save();

        res.status(201).json(savedAuthor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);

        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }

        res.status(200).json(author);
    } catch (error) {
        res.status(400).json({ error: "Invalid author ID" });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }

        res.status(200).json(author);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);

        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }

        res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Invalid author ID" });
    }
});

module.exports = router;