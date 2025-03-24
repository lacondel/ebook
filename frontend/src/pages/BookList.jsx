import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function BookList() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    return (
        <>
        <section className="heading">
            <p>Elige cuidadosamente lo que pones en ti</p>
        </section>
        </>
    )
}

export default BookList