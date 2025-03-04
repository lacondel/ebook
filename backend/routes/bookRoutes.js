const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, setBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(getAllBooks).post(protect, setBook);
router.route('/:id').get(getBookById).put(protect, updateBook).delete(protect, deleteBook);

module.exports = router;
