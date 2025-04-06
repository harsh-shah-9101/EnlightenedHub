import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/sign-up'
import Dashboard from './pages/dashboard'
import Job from './pages/job'
import AiChat from './pages/ai-chat'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/job" element={user ? <Job /> : <Navigate to="/login" />} />
      <Route path="/dashboard/ai-chat" element={user ? <AiChat /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
