const asyncHandler = require('express-async-handler');

// @desc Get all books
// @route GET /api/books
// @access Private
const getAllBooks = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get books' });
});

// @desc Get book by id
// @route GET /api/books:id
// @access Private
const getBookById = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get book ${req.params.id}` });
});

// @desc Set book
// @route POST /api/books
// @access Private
const setBook = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    };

    res.status(200).json({ message: 'Set book' });
});

// @desc Update book
// @route PUT /api/books:id
// @access Private
const updateBook = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update book ${req.params.id}` });
});

// @desc Delete book
// @route DELETE /api/books:id
// @access Private
const deleteBook = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete book ${req.params.id}` });
});

module.exports = {
    getAllBooks,
    getBookById,
    setBook,
    updateBook,
    deleteBook
}