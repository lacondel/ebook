import React from 'react'

function BookItem({ book }) {
    return (
        <div className='book'>
            <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.genre}</p>
            </div>
        </div>
    )
}

export default BookItem
