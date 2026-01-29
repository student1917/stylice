import React, {useRef} from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {NavLink, Link, useNavigate, useLocation} from 'react-router-dom'
import logo from '../assets/images/logo.png'
import LanguageSwitcher from './LanguageSwitcher'


const nav__links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/services',
    display:'Services'
  },
  
  {
    path: '/about',
    display:'AboutUs'
  },
  {
    path: '/contact',
    display: 'ContactUs'
  },
]


const Header = () => {

  const menuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = location.pathname === '/' || location.pathname === '/home'

  const toggleMenu = () => {  
    setMenuOpen(prev=>!prev)
  }

  useEffect(()=> {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

  return (
    <header className='sticky flex h-[80px] 2xl:h-[100px] w-full z-50 px-4'>
      <div className="flex items-center justify-between mx-auto xl:px-[120px] h-[50%] w-full my-auto ">
        {/* logo start*/}
        <div className="logo content-center px-0">
         <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        {/* logo end*/}
        {/* menu desktop start*/}
        <div className="menu flex space-between gap-4 items-center">
          <div className="nagavition">
            <ul className="sub__nav hidden lg:flex flex items-center gap-8" >
              {
                nav__links.map((item,index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className = {navClass=> {
                        return navClass.isActive ? "" :""
                      }}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
             
          {/* button start*/}
          <div className="button__group hidden lg:flex gap-4">
            {/* <LanguageSwitcher/>  */}
            <Link
              to="/login"
              className="border-[1.5px] rounded-[5px] px-4 py-2 text-center block"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border-[1.5px] rounded-[5px] !bg-[var(--text-color)] !text-white px-4 py-2 text-center block"
            >
              Signup
            </Link>
          </div>
          {/* button end */}        
        </div>
        {/* menu end */}
        <div className=" lg:hidden flex items-center">      
            <LanguageSwitcher/>     
            <span className='block lg:hidden' onClick={toggleMenu}>
            <i className="ri-menu-line"></i>          
            </span>
        </div>      
      </div>
        {/* mobile menu start */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={toggleMenu}
          />
          )}    
          <div 
            ref={menuRef}
            className={`fixed right-0 top-0 w-[25%] h-full bg-[var(--bg-color)] pt-16 mb-0 transition-transform duration-300 z-50
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={toggleMenu}>    
      

          <ul className="sub__nav flex flex-col items-center gap-8" >
              {
                nav__links.map((item,index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      // onClick={toggleMenu}                      
                      className = {navClass=> {
                        return navClass.isActive ? "!font-extrabold " :""
                      }}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))
              }
            </ul>  
            {/* button start*/}
            <div className="block lg:hidden button__group flex flex-col gap-5 my-12 items-center ">
              <Link
                to="/login"
                className="border-[1.5px] rounded-[5px] px-4 py-2 text-center block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border-[1.5px] rounded-[5px] !bg-[var(--text-color)] !text-white px-4 py-2 text-center block"
              >
                Signup
              </Link>  
            </div>
          {/* button end */}  
            </div>
            {/* </div> */}
       
       
         {/* mobile menu end */}
    </header>

  )
}

export default Header