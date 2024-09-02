import React from 'react'
import SignIn from './components/SignIn'
import { Route,Routes } from 'react-router-dom'
import Main from './components/Main'
import CreateArticle from './pages/CreateArticle'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
    <Routes>
      
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/' element={<Main/>} />
      <Route path='/createArticle' element={<CreateArticle/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path="/editArticle/:id" element={<CreateArticle/>} />
      
    </Routes>
    </>
  )
}

export default App
