import React from 'react'
import login from '../assets/images/login.png'
import {NavLink, Link, useNavigate, useLocation} from 'react-router-dom'
import icFb from '../assets/images/ic-fb.png'
import icGg from '../assets/images/ic-gg.png'
import logo from '../assets/images/logo.png'

const Register = () => {
  return (
   <>
       <div className="content-center ml-3 mt-6 mb-12">
          {/* <img src={logo} alt="" />
           */}
        {/* logo start*/}
        <div className="logo content-center px-0">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        {/* logo end*/}
        </div>
    <div id='container' className=" w-[80%] grid grid-cols-1  md:grid-cols-2 mx-auto  gap-12 flex justify-center">
  
      <div id="content__container" className='flex flex-col space-y-4 xl:space-y-8 justify-center content-center'>

          <div className="text-left">
            <h3 className='font-display font-extrabold text-3xl xl:text-[55px] leading-[100%] mb-1'>Welcome to Stylicle!</h3>
            <p>Kindly fill in your details below to create an account</p>
          </div>
          
          <div id="email" className=''>
            <p className='text-left'>Full Name</p>
            <input type="password" placeholder='Enter your full name'  className='w-full h-12 lg:h-16 pl-2 rounded-md border' />
          </div>

          <div id="email" className=''>
            <p className='text-left'>Email*</p>
            <input type="email" placeholder='Enter your email' className='w-full h-12 lg:h-16 pl-2 rounded-md border' />
          </div>

          <div id="email" className=''>
            <p className='text-left'>Phone Number*</p>
            <input type="password" placeholder='Enter your phone number' className='w-full h-12 lg:h-16 pl-2 rounded-md border' />
          </div>
          <div id="email" className=''>
            <p className='text-left'>Password</p>
            <input type="password" placeholder='Enter your password' className='w-full h-12 lg:h-16 pl-2 rounded-md border' />
          </div>
          <button className='flex justify-center rounded-md border w-full h-12 lg:h-16 items-center !bg-[#BA7894] text-white text-xl'>Register</button>
          <div className="flex items-center gap-4 w-full">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex w-full gap-6 justify-between">
            <button className='flex w-1/2 justify-center items-center border border-red-500 rounded-md'>
              <img src={icGg} alt="" />
              Google
            </button>
            <button className='flex w-1/2 justify-center items-center border border-sky-500 rounded-md'>
            <img src={icFb} alt="" />
              Facebook
            </button>
          </div>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
      <div className="img__container content-center">
        <img src={login} alt="" className='w-full object-cover hidden md:block max-h-[888px]'/>
      </div>

    </div>

   </>
  )
}

export default Register