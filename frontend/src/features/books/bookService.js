import axios from 'axios'

const API_URL = '/api/books/'

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

const bookService = {
    addBook
}

export default bookService