import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookService from './bookService'

const initialState = {
    books: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Add book
export const addBook = createAsyncThunk('books/add', async (bookData, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState()
        if (!auth.user?.token) {
            throw new Error('Требуется авторизация')
        }
        return await bookService.addBook(bookData, auth.user.token)
    } catch (error) {
        const message = error.message || 'Неизвестная ошибка'
        return thunkAPI.rejectWithValue(message)
    }
})

// Get books
export const getBooks = createAsyncThunk('books/getAll', async (_, thunkAPI) => {
    try {
        return await bookService.getBooks()
    } catch (error) {
        const message = error.message || 'Неизвестная ошибка'
        return thunkAPI.rejectWithValue(message)
    }
})

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.books.push(action.payload)
            })
            .addCase(addBook.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBooks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.books = action.payload
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }

})

export const { reset } = bookSlice.actions
export default bookSlice.reducer