const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Введите, пожалуйста, имя']
    },
    email: {
        type: String,
        required: [true, 'Введите, пожалуйста, email'],
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Пожалуйста, введите корректный адрес электронной почты'
        ]
    },
    password: {
        type: String,
        required: [true, 'Введите, пожалуйста, пароль'],
        minlength: [6, 'Пароль должен быть не менее 6 символов'],
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    readlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);