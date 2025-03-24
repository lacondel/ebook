import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    books: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

export const { reset } = bookSlice.actions
export default bookSlice.reducer