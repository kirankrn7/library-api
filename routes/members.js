const express = require("express");
const Member = require("../models/Member");
const Book = require("../models/Book");

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const member = new Member(req.body);
        const savedMember = await member.save();

        res.status(201).json(savedMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const members = await Member.find();

        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/:memberId/borrow/:bookId", async (req, res) => {
    try {
        const member = await Member.findById(req.params.memberId);
        const book = await Book.findById(req.params.bookId);

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        if (!book.available) {
            return res.status(400).json({ error: "Book is not available" });
        }

        book.available = false;
        await book.save();

        res.status(200).json({
            message: "Book borrowed successfully",
            book: book
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.post("/:memberId/return/:bookId", async (req, res) => {
    try {
        const member = await Member.findById(req.params.memberId);
        const book = await Book.findById(req.params.bookId);

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        book.available = true;
        await book.save();

        res.status(200).json({
            message: "Book returned successfully",
            book: book
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ error: "Invalid member ID" });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json({ message: "Member delete successfully" });
    } catch (error) {
        res.status(400).json({ error: "Invalid member ID" });
    }
});

module.exports = router;