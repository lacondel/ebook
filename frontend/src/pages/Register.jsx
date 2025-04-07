import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../component/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeatedPassword: ''
    })
    const [errors, setErrors] = useState({});

    const { name, email, password, repeatedPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Исправьте ошибки в форме');
            return;
        }

        const userData = {
            name,
            email,
            password,
        };

        dispatch(register(userData));
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name) newErrors.name = 'Имя обязательно';
        if (!emailRegex.test(email)) newErrors.email = 'Некорректный email';
        if (password.length < 6) newErrors.password = 'Минимум 6 символов';
        if (password !== repeatedPassword) newErrors.repeatedPassword = 'Пароли не совпадают';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Регистрация
                </h1>
                <p>Введите данные для регистрации</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Введите ваше имя"
                            onChange={onChange}
                        />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Введите ваш email"
                            onChange={onChange}
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Введите пароль"
                            onChange={onChange}
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="repeatedPassword"
                            name="repeatedPassword"
                            value={repeatedPassword}
                            placeholder="Подтвердите пароль"
                            onChange={onChange}
                        />
                        {errors.repeatedPassword && <div className="error">{errors.repeatedPassword}</div>}
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Зарегистрироваться
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register