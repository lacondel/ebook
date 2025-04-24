import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BookList from './pages/BookList'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './component/Header'
import EditBookForm from './component/EditBookForm'
import BookForm from './component/BookForm'

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
            <Route path='/edit-book/:id' element={<EditBookForm />} />
            <Route path='/book-form' element={<BookForm />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
