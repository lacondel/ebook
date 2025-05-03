import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookService from './bookService'

const initialState = {
    books: [],
    book: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    search: '',
    genre: '',
    sort: ''
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
export const getBooks = createAsyncThunk('books/getAll', async ({ search, genre, sort }, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState()
        if (!auth.user?.token) {
            throw new Error('Требуется авторизация')
        }
        return await bookService.getBooks({ search, genre, sort }, auth.user.token)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get book by id
export const getBookById = createAsyncThunk('books/getById', async (id, thunkAPI) => {
    try {
        return await bookService.getBookById(id)
    } catch (error) {
        const message = error.message || 'Неизвестная ошибка'
        return thunkAPI.rejectWithValue(message)
    }
})

// Update book
export const updateBook = createAsyncThunk('books/update', async ({ id, bookData }, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState()
        if (!auth.user?.token) {
            throw new Error('Требуется авторизация')
        }
        return await bookService.updateBook(id, bookData, auth.user.token)
    } catch (error) {
        const message = error.message || 'Неизвестная ошибка'
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete book
export const deleteBook = createAsyncThunk('books/delete', async (id, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState()
        if (!auth.user?.token) {
            throw new Error('Требуется авторизация')
        }
        return await bookService.deleteBook(id, auth.user.token)
    } catch (error) {
        const message = error.message || 'Неизвестная ошибка'
        return thunkAPI.rejectWithValue(message)
    }
})

export const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        reset: () => initialState,
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setGenre: (state, action) => {
            state.genre = action.payload
        },
        setSort: (state, action) => {
            state.sort = action.payload
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
                state.isError = false
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
                state.isError = false
                state.isSuccess = true
                state.books = action.payload
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBookById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.book = action.payload
            })
            .addCase(getBookById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.book = action.payload
                const index = state.books.findIndex(book => book._id === action.payload._id)
                if (index !== -1) {
                    state.books[index] = action.payload
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.books = state.books.filter(book => book._id !== action.payload)
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset, setSearch, setGenre, setSort } = bookSlice.actions
export default bookSlice.reducer