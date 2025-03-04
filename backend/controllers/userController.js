const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Все поля должны быть заполнены');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error(`Пользователь с почтой ${email} уже существует`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'user'
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Ошибка в данных пользователя');
    }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Ошибка учётных данных');
    }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    });
});

// @desc Get user wishlist
// @route GET /api/users/wishlist
// @access Private
const getWishlist = asyncHandler(async (req, res) => {
    res.json({ message: 'Получены книги из списка желаний' });
});

// @desc Remove book from user wishlist
// @route DELETE /api/users/wishlist:id
// @access Private
const removeFromWishlist = asyncHandler(async (req, res) => {
    res.json({ message: 'Книга удалена из списка желаний' });
});

// @desc Move book to readlist
// @route PATCH /api/users/wishlist:id
// @access Private
const moveToReadlist = asyncHandler(async (req, res) => {
    res.json({ message: 'Книга перемещена в список прочитанных' });
});

// @desc Get user readlist
// @route GET /api/users/readlist
// @access Private
const getReadlist = asyncHandler(async (req, res) => {
    res.json({ message: 'Получены книги из списка прочитанных' });
});

// @desc Remove book from user readlist
// @route DELETE /api/users/readlist:id
// @access Private
const removeFromReadlist = asyncHandler(async (req, res) => {
    res.json({ message: 'Книга удалена из списка прочитанных' });
});

// @desc Move book to wishlist
// @route GET /api/users/readlist:id
// @access Private
const moveToWishlist = asyncHandler(async (req, res) => {
    res.json({ message: 'Книга перемещена в список желаний' });
});

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '3h' });
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