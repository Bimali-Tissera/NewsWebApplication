import React from 'react'
import logo from '../images/logo_inshorts.webp'
import user from '../images/user.png'
import search from '../images/lens.png'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../firebase/setup'
import {signOut} from  'firebase/auth'



function NavBar() {

  const navigate = useNavigate()

  const logout = async() =>{
    
    try{
      await signOut(auth)
      navigate("/")
    }catch(err){
      console.error(err)

    }
    
  }

  const goToHome = () => {
    navigate('/home'); // Navigate to the home page
  };

  console.log(auth)

  return (
    <div className='grid grid-cols-3 bg-gray-300 text-gray-500 flex'>
      <div className='flex p-2'>
        <img src={logo} className='h-10 mt-3'/>
        {/* {auth.currentUser ?
          <button onClick={logout} className='text-gray-500 font-semibold text-sm flex hover:border border-gray-700 h-6 ml-7 mt-5'>
            Logout
          </button>
        
        
        :<Link to="/signin"> 
          <button className='text-gray-500 font-semibold text-sm flex hover:border border-gray-700 h-6 ml-7 w-40 mt-5'>
            <img src={user} className='h-5 w-6 mr-2 ml-2'/>
            Sign In
          </button>
        </Link>
        
        
      } */}
        
        
      
        
      </div>

      <div className='flex font-semibold text-sm'>
        
        <button onClick={goToHome} className='ml-7'>
          Home
        </button>

        <button className='ml-7'>
          News
        </button>

        <button className='ml-7'>
          Breaking News
        </button>

        <button className='ml-7'>
          Sports
        </button>

        <button className='ml-7'>
          Politics
        </button>

        
      </div>

      <div className='flex font-semibold p-4' >
        <button className='ml-60 flex'>
          <img src={search} className='h-6 mr-4 '/>
          Search 
        </button>
        
      </div>

    </div>
 

  )
}

export default NavBar