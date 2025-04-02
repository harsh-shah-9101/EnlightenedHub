import { useState } from 'react'
import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/sign-up'
import './App.css'
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </main>
  )
}

export default App
