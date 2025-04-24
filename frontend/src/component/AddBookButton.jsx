import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { importantToastConfig } from '../utils/toastConfig'

function AddBookButton() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const handleClick = () => {
        if (user?.role === 'admin') {
            navigate('/book-form')
        } else {
            toast.error('У вас нет прав для добавления книг', importantToastConfig)
        }
    }

    if (user?.role !== 'admin') {
        return null
    }

    return (
        <div className="add-book-container">
            <div className="add-book-button" onClick={handleClick}>
                <FaPlus className="icon" />
                <span className="text">Добавить книгу</span>
            </div>
        </div>
    )
}

export default AddBookButton 