const Book = require("../models/Book");

const authorizeBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

        if (!book.owner || book.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                error: "You are not authorized to modify this book"
            });
        }

        req.book = book;
        next();

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                error: "Book not found"
            });
        }
    }
};

module.exports = authorizeBook;