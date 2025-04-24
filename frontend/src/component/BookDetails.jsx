import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getBookById } from '../features/books/bookSlice'
import { FaArrowLeft } from 'react-icons/fa'
import Spinner from './Spinner'

function BookDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { book, isLoading, isError, message } = useSelector((state) => state.books)

    useEffect(() => {
        dispatch(getBookById(id))
    }, [dispatch, id])

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <div className="error-message">{message}</div>
    }

    if (!book) {
        return <div className="error-message">Книга не найдена</div>
    }

    return (
        <div className="book-details">
            <button className="btn btn-back" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Назад
            </button>
            <div className="book-details-content">
                <div className="book-details-image">
                    <img
                        src={`/covers${book.coverImage}`}
                        alt={book.title}
                        className="book-cover-large"
                    />
                </div>
                <div className="book-details-info">
                    <h2>{book.title}</h2>
                    <div className="book-meta">
                        <p className="author">
                            <strong>Автор:</strong> {book.author}
                        </p>
                        <p className="genre">
                            <strong>Жанр:</strong> {book.genre}
                        </p>
                    </div>
                    <div className="book-description">
                        <h3>Описание</h3>
                        <p>{book.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails 