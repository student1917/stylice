import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './../pages/Home';
import AboutUs from './../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../components/Layout/Layout';
import AuthLayout from '../components/Layout/AuthLayout';
import ServiceDetail from '../pages/ServiceDetail';
import Booking from '../pages/Booking';
import Service from '../pages/Services';
import Demo from '../pages/Demo';
import ThankYou from '../pages/ThankYou';


const Routers = () => {
  return (
    <Routes>
      <Route element={<AuthLayout/>}>
        < Route path='/login' element={<Login/>} />
        < Route path='/register' element={<Register/>} />
      </Route>

      <Route element={<Layout/>}>
        < Route path='/' element={<Navigate to='/home'/>} />
        < Route path='/home' element={<Home/>} />
        < Route path='/about' element={<AboutUs/>} />
        < Route path='/contact' element={<ContactUs/>} />
        < Route path='/services' element={<Service/>} />
        < Route path='/services/:id' element={<ServiceDetail/>} />
        < Route path='/booking/:id' element={<Booking/>} />
        < Route path='/thankyou' element={<ThankYou/>} />
        < Route path='/demo' element={<Demo/>} />
        
        <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default Routers