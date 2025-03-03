// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = (req, res) => {
    res.json({ message: 'Пользователь зарегистрирован' });
}

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = (req, res) => {
    res.json({ message: 'Пользователь авторизован' });
}

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = (req, res) => {
    res.json({ message: 'Данные пользователя получены' });
}

// @desc Get user wishlist
// @route GET /api/users/wishlist
// @access Private
const getWishlist = (req, res) => {
    res.json({ message: 'Получены книги из списка желаний' });
}

// @desc Remove book from user wishlist
// @route DELETE /api/users/wishlist:id
// @access Private
const removeFromWishlist = (req, res) => {
    res.json({ message: 'Книга удалена из списка желаний' });
}

// @desc Move book to readlist
// @route PATCH /api/users/wishlist:id
// @access Private
const moveToReadlist = (req, res) => {
    res.json({ message: 'Книга перемещена в список прочитанных' });
}

// @desc Get user readlist
// @route GET /api/users/readlist
// @access Private
const getReadlist = (req, res) => {
    res.json({ message: 'Получены книги из списка прочитанных' });
}

// @desc Remove book from user readlist
// @route DELETE /api/users/readlist:id
// @access Private
const removeFromReadlist = (req, res) => {
    res.json({ message: 'Книга удалена из списка прочитанных' });
}

// @desc Move book to wishlist
// @route GET /api/users/readlist:id
// @access Private
const moveToWishlist = (req, res) => {
    res.json({ message: 'Книга перемещена в список желаний' });
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getWishlist,
    removeFromWishlist,
    moveToReadlist,
    getReadlist,
    removeFromReadlist,
    moveToWishlist
}