import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBooks } from '../features/books/bookSlice'
import BookListContent from '../component/BookListContent'
import BookFilters from '../component/BookFilters'
import AddBookButton from '../component/AddBookButton'
import '../styles/BookList.css'

const BookList = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { books, isLoading, search, genre, sort } = useSelector((state) => state.books)

    const fetchBooks = useCallback(async () => {
        try {
            await dispatch(getBooks({ search, genre, sort }))
        } catch (error) {
            console.error('Fetch error:', error)
        }
    }, [dispatch, search, genre, sort])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks])

    return (
        <div className="book-list-page">
            <section className="content">
                <BookFilters />
                {user?.role === 'admin' && <AddBookButton />}
                <BookListContent 
                    books={books} 
                    isLoading={isLoading} 
                    user={user} 
                />
            </section>
        </div>
    )
}

export default BookList