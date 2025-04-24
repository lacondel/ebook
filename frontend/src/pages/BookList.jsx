import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBooks, reset } from '../features/books/bookSlice'
import Spinner from '../component/Spinner'
import BookItem from '../component/BookItem'
import AddBookButton from '../component/AddBookButton'
import { toast } from 'react-toastify'

function BookList() {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { books, isLoading, isError, message } = useSelector((state) => state.books)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getBooks())

        return () => {
            dispatch(reset())
        }
    }, [dispatch, isError, message])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <p>Elige cuidadosamente lo que pones en ti</p>
            </section>

            <AddBookButton />

            <section className='content'>
                {books.length > 0 ? (
                    <div className="books">
                        {books.map((book) => (
                            <BookItem key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    user?.role === 'admin' ? 
                    <h3>Список книг пуст. Добавьте первую книгу!</h3> : 
                    <h3>База книг пуста</h3> 
                )}
            </section>
        </>
    )
}

export default BookList