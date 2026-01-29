import React from 'react'
import login from '../assets/images/login.png'
import {NavLink, Link, useNavigate, useLocation} from 'react-router-dom'
import icFb from '../assets/images/ic-fb.png'
import icGg from '../assets/images/ic-gg.png'
import logo from '../assets/images/logo.png'

const Login = () => {
  return (
   <>
    <div className="content-center ml-3 mt-6 mb-12">
          {/* <img src={logo} alt="" />
          {/* logo start*/}
          <div className="logo content-center px-0">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          {/* logo end*/} */}
    </div>
    <div id='container' className="w-[80%] grid grid-cols-1 md:grid-cols-2 mx-auto my-16 gap-12 flex justify-center">
      <div id="content__container" className='flex flex-col space-y-4 xl:space-y-8 justify-center content-center'>

          <div className="text-left">
            <h3 className='font-display font-extrabold text-3xl xl:text-[55px] leading-[100%] mb-1 '>Welcome back!</h3>
            <p>Login to access all your data</p>
          </div>
          <div id="email" className=''>
            <p className='text-left'>Email</p>
            <input type="email" placeholder='Enter your email' className='w-full h-12 lg:h-16 rounded-md border pl-2' />
          </div>

          <div id="email" className=''>
            <p className='text-left'>Password</p>
            <input type="password" placeholder='Enter your password' className='w-full h-12 lg:h-16 rounded-md border pl-2' />
          </div>
          <button className='flex justify-center rounded-xl border w-full h-12 lg:h-16 items-center !bg-[#BA7894] text-white text-xl'>Login</button>
          <div className="flex items-center gap-4 w-full">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-sm text-gray-500">Continue with</span>
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
          <p>Don't have an account? <Link to='/register'>Create</Link></p>
      </div>
      <div className="img__container">
        <img src={login} alt="" className='w-full object-cover hidden md:block'/>
      </div>

    </div>

   </>
  )
}

export default Login