import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>EBook</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Войти
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Зарегистрироваться
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header