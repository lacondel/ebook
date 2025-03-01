const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Укажите, пожалуйста, название книги']
    },
    author: {
        type: String,
        required: [true, 'Укажите, пожалуйста, автора книги']
    },
    description: {
        type: String,
        minLength: [10, 'Описание должно быть не менее 10 символов'],
        maxLenght: [500, 'Описание не должно превышать 500 символов']
    },
    coverImage: {
        type: String,
        /* required: [true, 'Укажите, пожалуйста, URL изображение обложки'] */
    },
    genre: {
        type: String,
        required: [true, 'Укажите, пожалуйста, жанр книги']
    }
});

module.exports = mongoose.model('Book', bookSchema);