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

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);
router.get('/wishlist', getWishlist);
router.route('/wishlist/:id').delete(removeFromWishlist).patch(moveToReadlist);
router.get('/readlist', getReadlist);
router.route('/readlist/:id').delete(removeFromReadlist).patch(moveToWishlist);

module.exports = router;