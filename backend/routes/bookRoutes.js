const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, setBook, updateBook, deleteBook } = require('../controllers/bookController');

router.route('/').get(getAllBooks).post(setBook);
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;
