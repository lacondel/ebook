import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function BookForm() {
const onSubmit = (e) => {
    e.preventDefault()
}

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" />
                </div>
            </form>
        </section>
    )
}

export default BookForm
