const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

// @desc Get all books
// @route GET /api/books
// @access Public
const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find();

    res.status(200).json(books);
});

// @desc Get book by id
// @route GET /api/books:id
// @access Public
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

// @desc Add book to user wishlist
// @route POST /api/books/wishlist:id
// @access Private
const addBookToWishlist = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(400);
        throw new Error('Книга не найдена');
    }

    if (!req.user) {
        res.status(400);
        throw new Error('Пользователь не найден');
    }

    if (req.user.wishlist.includes(book._id)) {
        res.status(400);
        throw new Error('Книга уже в списке желаемого');
    }

    if (req.user.readlist.includes(book._id)) {
        res.status(400);
        throw new Error('Книга находится в списке прочитанных');
    }

    req.user.wishlist.push(book._id);
    await req.user.save();

    res.json({ message: 'Книга добавлена в ваш список желаемого' });
});

// @desc Add book to user readlist
// @route POST /api/books/readlist:id
// @access Private
const addBookToReadlist = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(400);
        throw new Error('Книга не найдена');
    }

    if (!req.user) {
        res.status(400);
        throw new Error('Пользователь не найден');
    }

    if (req.user.readlist.includes(book._id)) {
        res.status(400);
        throw new Error('Книга уже в списке прочитанных');
    }

    if (req.user.wishlist.includes(book._id)) {
        res.status(400);
        throw new Error('Книга находится в списке желаемого');
    }

    req.user.readlist.push(book._id);
    await req.user.save();

    res.json({ message: 'Книга добавлена в ваш список прочитанных' });
});

module.exports = {
    getAllBooks,
    getBookById,
    setBook,
    updateBook,
    deleteBook,
    addBookToWishlist,
    addBookToReadlist
}