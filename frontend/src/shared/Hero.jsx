import React from 'react'
import heroImg from '../assets/images/hero-img.png'
import heroIcon from '../assets/images/hero-icon.png'
import SearchBar from '../components/SearchBar'
import services from '../assets/data/service.js'
import ServiceCard from '../shared/ServiceCard'
import { useLocation } from 'react-router-dom'


const Hero = () => {

    const location = useLocation()
    const isHome = location.pathname === '/' || location.pathname === '/home'
  return (
    <div className="hero__section flex relative h-[475px] md:h-[576px] lg:h-screen max-h-[1000px] w-full">

    <div className="hero__gradient h-full absolute hero-gradient w-full sm:w-[80%] left-0 z-10">
    
      <div className="content__container flex absolute left-[10%] h-full  w-[90%] 2xl:w-[60%] z-20 content-center items-center">    
        <div className="hero__title w-[100%] text-left space-y-4">
          <div className="flex hero__subtitle gap-2 content-center items-center  ">
              <img src={heroIcon} alt="" className='w-6 h-6'/>
              <h4 className='text-white'>HAIR SALON, MASSEUSE, BEAUTY SALON</h4>           
            </div>
            <h1 className='font-bold'>Find a service <br/> close to you</h1>
            <p className="font-normal text-white text-[18px] leading-[170%] tracking-normal ">
              There are many variation of passages are Ipsum available,
              <br className="hidden sm:inline" />
              majority have suffered alteration in some form.
            </p>
              <div className="pr-6">
                {isHome && <SearchBar />}
              </div>
        </div>       
      
      </div>          
    </div>
    <div className="hero__banner h-full object-cover absolute w-full sm:w-[60%] right-0">
      <img src={heroImg} alt="" className='w-full h-full object-cover'/>
    </div>    

  </div>
  )
}

export default Hero