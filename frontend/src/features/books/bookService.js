import axios from 'axios'

const API_URL = '/api/books'

// Add book
const addBook = async (bookData, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const response = await axios.post(API_URL, bookData, config)
        return response.data

    } catch (error) {
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.error || error.response.data.message
        } else if (error.request) {
            errorMessage = 'Ошибка сети. Проверьте подключение к интернету'
        } else {
            errorMessage = error.message
        }
        throw new Error(errorMessage)
    }
}

// Get books
const getBooks = async ({ search, genre, sort }) => {
    try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (genre) params.append('genre', genre);
        if (sort) params.append('sort', sort);

        const response = await axios.get(`${API_URL}?${params.toString()}`);
        return response.data;
    } catch (error) {
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.error || error.response.data.message
        } else if (error.request) {
            errorMessage = 'Ошибка сети. Проверьте подключение к интернету'
        } else {
            errorMessage = error.message
        }
        throw new Error(errorMessage)
    }
}

// Get book by id
const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data
    } catch (error) {
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.error || error.response.data.message
        } else if (error.request) {
            errorMessage = 'Ошибка сети. Проверьте подключение к интернету'
        } else {
            errorMessage = error.message
        }
        throw new Error(errorMessage)
    }
}

// Update book
const updateBook = async (id, bookData, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const response = await axios.put(`${API_URL}/${id}`, bookData, config)
        return response.data
    } catch (error) {
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.error || error.response.data.message
        } else if (error.request) {
            errorMessage = 'Ошибка сети. Проверьте подключение к интернету'
        } else {
            errorMessage = error.message
        }
        throw new Error(errorMessage)
    }
}

// Delete book
const deleteBook = async (id, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const response = await axios.delete(`${API_URL}/${id}`, config)
        return response.data
    } catch (error) {
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.error || error.response.data.message
        } else if (error.request) {
            errorMessage = 'Ошибка сети. Проверьте подключение к интернету'
        } else {
            errorMessage = error.message
        }
        throw new Error(errorMessage)
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