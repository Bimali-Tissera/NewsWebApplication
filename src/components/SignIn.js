import React from 'react'
import frontBanner from "../images/bannerbanner.jpg"
import logo from "../images/logo_inshorts.webp"
import {signInWithPopup} from "firebase/auth"
import {auth,googleProvider} from "../firebase/setup"
import { useNavigate } from 'react-router-dom'

 function SignIn() {

    const navigate = useNavigate()

    const googleSignin = async() => {
    
        try{
           await signInWithPopup(auth,googleProvider) 
            auth.currentUser && navigate("/")
        
        }catch(err){
        console.error(err)

    }
    }

    console.log(auth)

  return (
    <div className='grid grid-cols-2 bg-white h-screen'>
        <div className='text-center'>
            <img src={logo} className='h-16 ml-60 mt-32'></img>
            <h1 className='text-black text-3xl font-semibold mt-7'>Sign in</h1>
            <button onClick={googleSignin} className="bg-gray-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded h-14 w-96 mt-14">
                Sign In
            </button>
            <h4 className='text-black underline mt-7'>Sign in now</h4>
        </div>

        <div>
            <img src={frontBanner} className='h-screen' /> 
        </div>

    
    </div>
  )
}

export default SignIn
