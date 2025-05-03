import axios from 'axios'

const API_URL = '/api/books'

// Создать новую книгу
const addBook = async (bookData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.post(API_URL, bookData, config)
        return response.data
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Ошибка при создании книги')
        } else if (error.request) {
            throw new Error('Нет ответа от сервера')
        } else {
            throw new Error('Ошибка при отправке запроса')
        }
    }
}

// Получить все книги
const getBooks = async ({ search, genre, sort }, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (genre) params.append('genre', genre)
        if (sort) params.append('sort', sort)

        const response = await axios.get(`${API_URL}?${params.toString()}`, config)
        return response.data
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Ошибка при получении списка книг')
        } else if (error.request) {
            throw new Error('Нет ответа от сервера')
        } else {
            throw new Error('Ошибка при отправке запроса')
        }
    }
}

// Получить книгу по ID
const getBookById = async (bookId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.get(`${API_URL}/${bookId}`, config)
        return response.data
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Ошибка при получении книги')
        } else if (error.request) {
            throw new Error('Нет ответа от сервера')
        } else {
            throw new Error('Ошибка при отправке запроса')
        }
    }
}

// Обновить книгу
const updateBook = async (bookId, bookData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.put(`${API_URL}/${bookId}`, bookData, config)
        return response.data
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Ошибка при обновлении книги')
        } else if (error.request) {
            throw new Error('Нет ответа от сервера')
        } else {
            throw new Error('Ошибка при отправке запроса')
        }
    }
}

// Удалить книгу
const deleteBook = async (bookId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.delete(`${API_URL}/${bookId}`, config)
        return response.data
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Ошибка при удалении книги')
        } else if (error.request) {
            throw new Error('Нет ответа от сервера')
        } else {
            throw new Error('Ошибка при отправке запроса')
        }
    }
}

const bookService = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}

export default bookService