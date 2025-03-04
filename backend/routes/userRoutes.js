const express = require('express');
const router = express.Router();
const { 
    registerUser,
    loginUser,
    getMe,
    getWishlist,
    removeFromWishlist,
    moveToReadlist,
    getReadlist,
    removeFromReadlist,
    moveToWishlist } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/wishlist', protect, getWishlist);
router.route('/wishlist/:id').delete(protect, removeFromWishlist).patch(protect, moveToReadlist);
router.get('/readlist', protect, getReadlist);
router.route('/readlist/:id').delete(protect, removeFromReadlist).patch(protect, moveToWishlist);

module.exports = router;