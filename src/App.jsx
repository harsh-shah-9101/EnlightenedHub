import { useState, useEffect } from 'react'
import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/sign-up'
import Dashboard from './pages/dashboard'
import Job from './pages/job'
import Settings from './pages/setting'
import AiChat from './pages/ai-chat'
import MyCourses from './pages/my-courses'
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
      <Route path="/dashboard/courses" element={<MyCourses />} />
      <Route path="/dashboard/setting" element={<Settings />} /> {/* Fixed: Changed <setting /> to <Settings /> */}
    </Routes>
  )
}

export default App
