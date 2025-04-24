import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { importantToastConfig } from '../utils/toastConfig'
import DeleteBookModal from './DeleteBookModal'

function BookItem({ book }) {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const onClickEdit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (user?.role === 'admin') {
            navigate(`/edit-book/${book._id}`)
        } else {
            toast.error('У вас нет прав для редактирования книг', importantToastConfig)
        }
    }

    const onClickDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (user?.role === 'admin') {
            setShowDeleteModal(true)
        } else {
            toast.error('У вас нет прав для удаления книг', importantToastConfig)
        }
    }

    return (
        <>
            <div className='book'>
                <Link to={`/books/${book._id}`} className="book-content">
                    <div className="book-cover-container">
                        <img
                            src={`/covers${book.coverImage}`}
                            alt={book.title}
                            className="book-cover"
                        />
                    </div>
                    <div className="book-info">
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p>{book.genre}</p>
                    </div>
                </Link>

                {user?.role === 'admin' && (
                    <div className="admin-controls">
                        <button 
                            className="admin-btn edit-btn" 
                            onClick={onClickEdit}
                            title="Редактировать книгу"
                        >
                            <FaEdit />
                        </button>
                        <button 
                            className="admin-btn delete-btn" 
                            onClick={onClickDelete}
                            title="Удалить книгу"
                        >
                            <FaTrash />
                        </button>
                    </div>
                )}
            </div>
            {showDeleteModal && (
                <DeleteBookModal
                    book={book}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </>
    )
}

export default BookItem