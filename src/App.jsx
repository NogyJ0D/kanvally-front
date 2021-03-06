import React from 'react-dom'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { autologin } from './features/userSlice'
import Signup from './pages/Signup'
import Team from './pages/Team'
import ProtectedRoute from './helpers/ProtectedRoute'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autologin())
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='project/:id' element={<Project />} />
          <Route path='team/:id' element={<Team />} />
        </Route>
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  )
}

export default App
