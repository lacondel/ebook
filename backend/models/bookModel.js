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
        required: [true, 'Укажите, пожалуйста, описание книги'],
        minLength: [10, 'Описание должно быть не менее 10 символов'],
        maxLength: [5000, 'Описание не должно превышать 5000 символов']
    },
    coverImage: {
        type: String,
        required: [true, 'Укажите, пожалуйста, URL изображение обложки']
    },
    genre: {
        type: String,
        enum: [ 'комедия',
                'драма',
                'фантастика',
                'ужасы',
                'детектив',
                'приключения',
                'мистика',
                'фэнтези',
                'психология',
                'история',
                'трагедия',
                'роман',
                'роман-эпопея',
                'повесть',
                'рассказ',
                'триллер',
                'научная литература',
                'биография',
                'поэзия',
                'лирическое стихотворение',
                'элегия',
                'послание',
                'эпиграмма',
                'ода',
                'сонет',
                'поэма',
                'баллада',
                'сказка',
                'публицистика',
                'художественная литература',
                'литература',
                'классика',
                'современная проза',
                'антиутопия',
                'боевик',
                'военная проза',
                'детская литература',
                'исторический роман',
                'криминальный роман',
                'любовный роман',
                'мемуары',
                'научная фантастика',
                'политический роман',
                'притча',
                'реализм',
                'сатира',
                'сентиментальный роман',
                'социальная проза',
                'философская проза',
                'философия',
                'эпистолярный роман',
                'эссе',
                'научно-популярная литература',
                'философская сказка',
                'программирование' ],
        required: [true, 'Укажите, пожалуйста, жанр книги']
    }
});

// Создаем индексы для оптимизации поиска, сортировки и фильтрации
bookSchema.index({ title: 'text' }, { name: 'title_text_search' }); // Текстовый индекс только для поиска по названию
bookSchema.index({ genre: 1 }); // Индекс для фильтрации по жанру
bookSchema.index({ title: 1 }); // Индекс для сортировки по названию
bookSchema.index({ genre: 1, title: 1 }); // Составной индекс для фильтрации по жанру и сортировки по названию

module.exports = mongoose.model('Book', bookSchema);