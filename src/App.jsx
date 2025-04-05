import { useState, useEffect } from 'react'
import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/sign-up'
import Dashboard from './pages/dashboard'
import Job from './pages/job'
import AiChat from './pages/ai-chat'
import './App.css'
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/job" element={<Job />} />
      <Route path="/dashboard/ai-chat" element={<AiChat />} />
    </Routes>
  )
}

export default App
