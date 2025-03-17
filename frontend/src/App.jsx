import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookList from './pages/BookList'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './component/Header'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<BookList />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
