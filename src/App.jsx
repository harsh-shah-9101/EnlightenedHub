import { useState, useEffect } from 'react'
import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/sign-up'
import './App.css'
import {Routes, Route} from "react-router-dom"
import useLocomotive from './hooks/useLocomotive'

function App() {
  useLocomotive();

  return (
    <main data-scroll-container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </main>
  )
}

export default App
