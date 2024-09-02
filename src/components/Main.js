import React from 'react'
import NavBar from './NavBar'
import Home from './Home'
import {auth} from '../firebase/setup'
import Dashboard from './Dashboard'
import SignIn from './SignIn'

function Main() {
  return (
    <div className='grid grid-rows-2'>
    
       
        
        {/* { auth.currentUser? 
         <Dashboard/>
        :
        <Home/>
        } */}
       <SignIn/>
        
    </div>
  )
}

export default Main