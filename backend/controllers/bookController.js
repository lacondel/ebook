const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');

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

// @desc Add book
// @route POST /api/books
// @access Private
const addBook = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array().map(e => e.msg).join(', '));
    }

    if (!req.body.title || !req.body.author || !req.body.description || !req.body.coverImage || !req.body.genre) {
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

    res.status(201).json(book);
});

// @desc Update book
// @route PUT /api/books/:id
// @access Private
const updateBook = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array().map(e => e.msg).join(', '));
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error('Книга не найдена');
    }

    const { title, author, description, coverImage, genre } = req.body;
    
    if (!title || !author || !description || !coverImage || !genre) {
        res.status(400);
        throw new Error('Все поля обязательны для заполнения');
    }

    if (description.length < 10 || description.length > 5000) {
        res.status(400);
        throw new Error('Описание должно быть от 10 до 5000 символов');
    }

    if (!Book.schema.path('genre').enumValues.includes(genre)) {
        res.status(400);
        throw new Error('Указан неверный жанр');
    }

    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
            title,
            author,
            description,
            coverImage,
            genre
        },
        {
            new: true,
            runValidators: true
        }
    );

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
    addBook,
    updateBook,
    deleteBook,
    addBookToWishlist,
    addBookToReadlist
}