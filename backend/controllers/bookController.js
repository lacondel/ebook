const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');

// @desc Get all books
// @route GET /api/books
// @access Private
const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find();

    res.status(200).json(books);
});

// @desc Get book by id
// @route GET /api/books:id
// @access Private
const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(400);
        throw new Error('Книга не найдена');
    }

    res.status(200).json(book);
});

// @desc Set book
// @route POST /api/books
// @access Private
const setBook = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error('Название книги обязательно');
    };

    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        coverImage: req.body.coverImage,
        genre: req.body.genre,
    });

    res.status(200).json(book);
});

// @desc Update book
// @route PUT /api/books:id
// @access Private
const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(400);
        throw new Error('Книга не найдена');
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedBook);
});

// @desc Delete book
// @route DELETE /api/books:id
// @access Private
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(400);
        throw new Error('Книга не найдена');
    }

    await book.deleteOne();

    res.status(200).json(req.params.id);
});

module.exports = {
    getAllBooks,
    getBookById,
    setBook,
    updateBook,
    deleteBook
}