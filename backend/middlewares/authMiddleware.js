const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                res.status(401);
                throw new Error('Пользователь не авторизован');
            }

            req.user = user;
            next();
            return;
        } catch (error) {
            let message = 'Невалидный токен';
            if (error.name === 'TokenExpiredError') {
                message = 'Токен истек';
            }
            if (error.name === 'JsonWebTokenError') {
                message = 'Невалидная подпись токена';
            }

            res.status(401).json({ message });
            return;
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Требуется авторизация. Токен отсутствует'
        });
    }
});


module.exports = { protect };
