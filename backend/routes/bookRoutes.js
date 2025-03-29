const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, addBook, updateBook, deleteBook, addBookToWishlist, addBookToReadlist } = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(getAllBooks).post(protect, addBook);
router.route('/:id').get(getBookById).put(protect, updateBook).delete(protect, deleteBook);
router.post('/wishlist/:id', protect, addBookToWishlist);
router.post('/readlist/:id', protect, addBookToReadlist);

module.exports = router;
