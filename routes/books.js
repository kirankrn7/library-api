const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();

        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const filter = {};

        if (req.query.genre) {
            filter.genre = req.query.genre;
        }

        if (req.query.available) {
            filter.available = req.query.available === "true";
        }

        if (req.query.title) {
            filter.title = { $regex: req.query.title, $options: "i" };
        }

        const books = await Book.find(filter).populate("author");

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("author");

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: "Invalid book ID" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate("author");

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Invalid book ID" });
    }
});

module.exports = router;