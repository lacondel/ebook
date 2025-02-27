// @desc Get all books
// @route GET /api/books
// @access Private
const getAllBooks = (req, res) => {
    res.status(200).json({ message: 'Get books' });
}

// @desc Get book by id
// @route GET /api/books:id
// @access Private
const getBookById = (req, res) => {
    res.status(200).json({ message: `Get book ${req.params.id}` });
}

// @desc Set book
// @route POST /api/books
// @access Private
const setBook = (req, res) => {
    res.status(200).json({ message: 'Set book' });
}

// @desc Update book
// @route PUT /api/books:id
// @access Private
const updateBook = (req, res) => {
    res.status(200).json({ message: `Update book ${req.params.id}` });
}

// @desc Delete book
// @route DELETE /api/books:id
// @access Private
const deleteBook = (req, res) => {
    res.status(200).json({ message: `Delete book ${req.params.id}` });
}

module.exports = {
    getAllBooks,
    getBookById,
    setBook,
    updateBook,
    deleteBook
}