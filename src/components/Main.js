import React from 'react'
import NavBar from './NavBar'
import Home from './Home'
import {auth} from '../firebase/setup'
import Dashboard from './Dashboard'

function Main() {
  return (
    <div className='grid grid-rows-2'>
    
        <NavBar/>
        
        { auth.currentUser? 
         <Dashboard/>
        :
        <Home/>
        }
       
        
    </div>
  )
}

export default Main