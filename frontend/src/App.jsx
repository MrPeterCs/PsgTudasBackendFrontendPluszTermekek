import { useState } from 'react'
import './App.css'

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import AdminNavbar from './AdminNavbar'
import Admin from './Admin'
import GuestNavbar from './GuestNavbar'
import Home from './Home'
import Login from './Login'
import Products from './Products'
import Register from './Register'
import UserNavbar from './UserNavbar'
import UserProfile from './UserProfile'
import ProductsUpL from './ProductsUpLoad'

import "bootstrap/dist/css/bootstrap.min.css"
function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })
  function getUser(){
    return user
    
  }
  console.log(user)
  function logout()
  {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }
  return (
    <BrowserRouter>
      {user ? user.role === 1 ? <AdminNavbar logout={logout}/> : <UserNavbar logout={logout}/> : <GuestNavbar/>}
      <Routes>
        <Route path="/" element={user?.role === 1 ? <Navigate to="/adminHome" replace/> : <Home />} />

        <Route path="/register" element={user ? <Navigate to={user.role === 1 ? "/adminHome" : "/profile"} replace/>: <Register/>}/>
        <Route path="/login" element={user ? <Navigate to={user.role === 1 ? "/adminHome" : "/profile"} replace/>: <Login setUserLogin={setUser}/>} />
        <Route path="/profile" element={user ? user.role === 1 ? <Navigate to="/adminHome" replace/> : <UserProfile getUser={getUser}/> : <Navigate to="/login" replace/>}  />
        <Route path='/ProductsUpLoad' element={user?.role === 1 ? <ProductsUpL/> : <Navigate to="/" replace/>}/>
        <Route path='/Products' element={user?.role === 1 ? <Products/> : <Navigate to="/adminHome" replace/>}/>
        <Route path='/adminHome' element={user?.role ===1 ? <Admin/> : <Navigate to="/adminHome" replace/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
