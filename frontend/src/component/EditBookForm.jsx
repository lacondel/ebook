import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getBookById, updateBook, reset } from '../features/books/bookSlice'
import Spinner from './Spinner'

const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}

function EditBookForm() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        coverImage: '',
        genre: '',
    })
    const [isEdited, setIsEdited] = useState(false)

    const { title, author, description, coverImage, genre } = formData
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { book, isLoading, isError, isSuccess, message } = useSelector((state) => state.books)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            toast.error('У вас нет прав для редактирования книг', toastConfig)
            navigate('/')
            return
        }

        dispatch(getBookById(id))

        return () => {
            dispatch(reset())
        }
    }, [dispatch, id, navigate, user])

    useEffect(() => {
        if (isError) {
            toast.error(message, toastConfig)
            dispatch(reset())
        }

        if (isSuccess && isEdited) {
            toast.success('Книга успешно обновлена', {
                ...toastConfig,
                autoClose: 2000,
                onClose: () => {
                    navigate('/')
                    dispatch(reset())
                }
            })
        }
    }, [isError, isSuccess, message, dispatch, navigate, isEdited])

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                author: book.author || '',
                description: book.description || '',
                coverImage: book.coverImage || '',
                genre: book.genre || '',
            })
        }
    }, [book])

    const [touchedFields, setTouchedFields] = useState({})

    const handleBlur = (e) => {
        setTouchedFields({
            ...touchedFields,
            [e.target.name]: true
        })

        if (e.target.name === 'description' && e.target.value.length < 10) {
            toast.warning('Описание должно быть не менее 10 символов', {
                ...toastConfig,
                autoClose: 2000
            })
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!title || !author || !description || !coverImage || !genre) {
            toast.error('Заполните все обязательные поля', toastConfig)
            return
        }

        if (description.length < 10) {
            toast.error('Описание должно быть не менее 10 символов', toastConfig)
            return
        }

        const imagePattern = /^[\w-]+\.(jpe?g|png|gif|webp|svg)$/i;
        if (!imagePattern.test(coverImage)) {
            toast.error('Введите корректное название файла изображения (например: book.jpg)', toastConfig)
            return
        }

        setIsEdited(true)
        const bookData = { 
            title, 
            author, 
            description, 
            coverImage: `/covers/${coverImage}`, 
            genre 
        }
        dispatch(updateBook({ id, bookData }))
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
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className='form-control'
                        id='author'
                        name='author'
                        value={author}
                        placeholder='Введите ФИО автора книги'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        className={`form-control ${touchedFields.description && description.length < 10 ? 'is-invalid' : ''}`}
                        id='description'
                        name='description'
                        value={description}
                        placeholder='Введите описание книги'
                        onChange={onChange}
                        onBlur={handleBlur}
                        rows={6}
                        maxLength={5000}
                    />
                    <div className="character-count">
                        {description.length} / 5000 символов
                    </div>
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
                        placeholder='Введите название файла изображения (например: book.jpg)'
                        onChange={onChange}
                    />
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
                        <option value="роман">Роман</option>
                        <option value="роман-эпопея">Роман-эпопея</option>
                        <option value="повесть">Повесть</option>
                        <option value="рассказ">Рассказ</option>
                        <option value="триллер">Триллер</option>
                        <option value="научная литература">Научная литература</option>
                        <option value="биография">Биография</option>
                        <option value="поэзия">Поэзия</option>
                        <option value="лирическое стихотворение">Лирическое стихотворение</option>
                        <option value="элегия">Элегия</option>
                        <option value="послание">Послание</option>
                        <option value="эпиграмма">Эпиграмма</option>
                        <option value="ода">Ода</option>
                        <option value="сонет">Сонет</option>
                        <option value="поэма">Поэма</option>
                        <option value="баллада">Баллада</option>
                        <option value="сказка">Сказка</option>
                        <option value="публицистика">Публицистика</option>
                        <option value="художественная литература">Художественная литература</option>
                        <option value="литература">Литература</option>
                        <option value="классика">Классика</option>
                        <option value="современная проза">Современная проза</option>
                        <option value="антиутопия">Антиутопия</option>
                        <option value="боевик">Боевик</option>
                        <option value="военная проза">Военная проза</option>
                        <option value="детская литература">Детская литература</option>
                        <option value="исторический роман">Исторический роман</option>
                        <option value="криминальный роман">Криминальный роман</option>
                        <option value="любовный роман">Любовный роман</option>
                        <option value="мемуары">Мемуары</option>
                        <option value="научная фантастика">Научная фантастика</option>
                        <option value="политический роман">Политический роман</option>
                        <option value="притча">Притча</option>
                        <option value="реализм">Реализм</option>
                        <option value="сатира">Сатира</option>
                        <option value="сентиментальный роман">Сентиментальный роман</option>
                        <option value="социальная проза">Социальная проза</option>
                        <option value="философская проза">Философская проза</option>
                        <option value="философия">Философия</option>
                        <option value="эпистолярный роман">Эпистолярный роман</option>
                        <option value="эссе">Эссе</option>
                        <option value="научно-популярная литература">Научно-популярная литература</option>
                        <option value="философская сказка">Философская сказка</option>
                        <option value="программирование">Программирование</option>
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>
                        Обновить книгу
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

export default EditBookForm 