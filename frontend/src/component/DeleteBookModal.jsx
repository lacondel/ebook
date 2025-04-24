import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBook, getBooks } from '../features/books/bookSlice'
import { toast } from 'react-toastify'
import { importantToastConfig, quickToastConfig } from '../utils/toastConfig'

function DeleteBookModal({ book, onClose }) {
    const dispatch = useDispatch()

    const handleDelete = async () => {
        try {
            await dispatch(deleteBook(book._id)).unwrap()
            toast.success('Книга успешно удалена', quickToastConfig)
            await dispatch(getBooks()).unwrap()
            onClose()
        } catch (error) {
            toast.error(error, importantToastConfig)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Подтверждение удаления</h2>
                <p>Вы действительно хотите удалить книгу "{book.title}"?</p>
                <p>Это действие нельзя будет отменить.</p>
                <div className="modal-buttons">
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Удалить
                    </button>
                    <button className="btn" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBookModal 