import React from 'react'
import SignIn from './components/SignIn'
import { Route,Routes } from 'react-router-dom'
import Main from './components/Main'
import CreateArticle from './pages/CreateArticle'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

function App() {
    const isAuthenticated = true; // Replace with actual authentication logic
    const role = 'user'; // Replace with actual role logic

  return (

    <>
    <Routes>
      
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/' element={<Main/>} />
      <Route path='/createArticle' element={<CreateArticle/>}/>
      {/* <Route path='/dashboard'element={<Dashboard />}/> */}
              
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path="/editArticle/:id" element={<CreateArticle/>} />
      <Route path='/home' element={<Home/>}/>
      <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
