import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addBook, reset } from '../features/books/bookSlice'
import Spinner from './Spinner'


function BookForm() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        coverImage: '',
        genre: '',
    })

    const { title, author, description, coverImage, genre } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.books)

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }

        if (isSuccess) {
            toast.success('Книга успешно добавлена')
            setFormData({
                title: '',
                author: '',
                description: '',
                coverImage: '',
                genre: '',
            });
            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])

    const [touchedFields, setTouchedFields] = useState({});

    const handleBlur = (e) => {
        setTouchedFields({
            ...touchedFields,
            [e.target.name]: true
        });

        // Дополнительная валидация при потере фокуса
        if (e.target.name === 'description' && e.target.value.length < 10) {
            toast.error('Описание должно быть не менее 10 символов', { autoClose: 2000 })
        }
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!title || !author || !description || !coverImage || !genre) {
            toast.error('Заполните все обязательные поля')
            return
        }

        if (description.length < 10) {
            toast.error('Описание должно быть не менее 10 символов')
            return
        }

        const urlPattern = /^\/[\w/-]+\.(jpe?g|png|gif|webp|svg)$/i;
        if (!urlPattern.test(coverImage)) {
            toast.error('Введите корректный URL изображения')
            return
        }

        const bookData = { title, author, description, coverImage, genre }
        dispatch(addBook(bookData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className='form-control'
                        id='title'
                        name='title'
                        value={title}
                        placeholder='Введите название книги'
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className='form-control'
                        id='author'
                        name='author'
                        value={author}
                        placeholder='Введите ФИО автора книги'
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control ${touchedFields.description && description.length < 10 ? 'is-invalid' : ''}`}
                        id='description'
                        name='description'
                        value={description}
                        placeholder='Введите описание книги'
                        onChange={onChange}
                        onBlur={handleBlur}
                    />
                    {description.length < 10 && touchedFields.description && (
                        <div className="invalid-feedback" style={{ color: 'red', fontSize: '0.8rem', textAlign: 'left' }}>
                            Описание должно быть минимум 10 символов
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className='form-control'
                        id='coverImage'
                        name='coverImage'
                        value={coverImage}
                        placeholder='Введите путь до изображения обложки'
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <select
                        className='form-control'
                        id="genre"
                        name="genre"
                        value={genre}
                        onChange={onChange}
                        required
                    >
                        <option value="">Выберите жанр</option>
                        <option value="комедия">Комедия</option>
                        <option value="драма">Драма</option>
                        <option value="фантастика">Фантастика</option>
                        <option value="ужасы">Ужасы</option>
                        <option value="детектив">Детектив</option>
                        <option value="приключения">Приключения</option>
                        <option value="мистика">Мистика</option>
                        <option value="фэнтези">Фэнтези</option>
                        <option value="психология">Психология</option>
                        <option value="история">История</option>
                        <option value="трагедия">Трагедия</option>
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>
                        Добавить книгу
                    </button>
                </div>
                <div className="form-group">
                    <button type="button" className='btn btn-block' onClick={() => navigate('/')}>
                        Вернуться
                    </button>
                </div>
            </form>
        </section>
    )
}

export default BookForm
