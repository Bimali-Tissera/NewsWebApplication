import React from 'react'
import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import { Route,Routes } from 'react-router-dom'
import Main from './components/Main'

function App() {
  return (
    <>
    <Routes>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/' element={<Main/>} />
    </Routes>
    </>
  )
}

export default App
