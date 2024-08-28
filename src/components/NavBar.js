import React from 'react'
import logo from '../images/logo_inshorts.webp'
import user from '../images/user.png'
import search from '../images/lens.png'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='grid grid-cols-3 bg-black h-15 text-gray-500'>
      <div className='flex'>
        <img src={logo} className='h-10 mt-3'/>
        
        <Link to="/signin">
        <button className='text-gray-500 font-semibold text-sm flex hover:border border-gray-700 h-6 ml-7 w-40 mt-5'>
          <img src={user} className='h-5 w-6 mr-2 ml-2'/>
          Sign In
        </button>
        </Link>
        
        
      </div>

      <div className='flex font-semibold text-sm'>
        <button className='ml-7'>
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