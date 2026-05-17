import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
 
import Profile from './pages/Profile'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
          <Routes>
             <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>
    
    </BrowserRouter>
    
    </>
  )
}

export default App
