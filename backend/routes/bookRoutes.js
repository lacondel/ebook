const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, addBook, updateBook, deleteBook, addBookToWishlist, addBookToReadlist } = require('../controllers/bookController');
const { protect, adminProtect } = require('../middlewares/authMiddleware');
const Book = require('../models/bookModel');
const { body } = require('express-validator');

router.post(
    '/',
    protect,
    [
        body('title').notEmpty().withMessage('Название обязательно'),
        body('author').notEmpty().withMessage('Автор обязателен'),
        body('description')
            .isLength({ min: 10 })
            .withMessage('Описание должно быть минимум 10 символов'),
        body('genre').isIn(Book.schema.path('genre').enumValues)
    ],
    addBook
);

router.route('/').get(getAllBooks).post(protect, adminProtect, addBook);
router.route('/:id').get(getBookById).put(protect, adminProtect, updateBook).delete(protect, adminProtect, deleteBook);
router.post('/wishlist/:id', protect, addBookToWishlist);
router.post('/readlist/:id', protect, addBookToReadlist);

module.exports = router;
