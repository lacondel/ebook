import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BookForm from "../component/BookForm";

function AdminPage() {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <>
            <section className="heading">
                <h1>Страница администратора</h1>
                <p>Здесь вы можете добавлять книги</p>
            </section>

            <BookForm />
        </>
    )
}

export default AdminPage