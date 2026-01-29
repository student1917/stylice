import React from 'react'
import logoService from '../assets/images/Logo-service.png'
import icon01 from '../assets/images/ic-1.png'
import icon02 from '../assets/images/ic-2.png'
import icon03 from '../assets/images/ic-3.png'
import icon04 from '../assets/images/ic-4.png'


const explore__links = [
  {
    path:'/home',
    display:'Home'
  },
  {
    path: '/about',
    display:'About Us'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/blog',
    display: 'Blog'
  },
  {
    path: '/contact',
    display: 'Contac tUs'
  },
]

const utility__links = [
  {
    path:'/privacy',
    display:'Privacy Policy'
  },
  {
    path: '/termsofuse',
    display:'Terms of Use'
  },
]

const Footer = () => {
  return (
    <>
    <div id="footer__container" className="flex flex-col bg-[#241520] text-[#fff] justify-center h-full w-full">
      <div id="content__container" className='flex flex-col w-full h-full xl:h-[70%] mx-auto my-12'>
        <div id="beauty" className='flex flex-col sm:flex-row  w-[70%] justify-between mx-auto'>
          <div className="items-center justify-center mb-12">
            <img src={logoService} alt="" className=' h-[35px] sm:h-[50px] sm:w-full object-cover '/>
          </div>
          <div id="icon__group" className='flex sm:gap-2 h-auto object-cover '>
            <a href="#">
              <img src={icon01} alt="" className='w-[80%] sm:w-full'/>
            </a>
            <a href="#">
              <img src={icon02} alt="" className='w-[80%] sm:w-full' />
            </a>
            <a href="#">
              <img src={icon03} alt="" className='w-[80%] sm:w-full' />
            </a>
            <a href="#">
              <img src={icon04} alt="" className='w-[80%] sm:w-full' />
            </a>
          </div>
        </div>
        <hr className='border-t border-white my-6 w-[70%] mx-auto my-12 '/>

        <div id="content" className='grid w-[70%] grid-cols-1 lg:grid-cols-3  mx-auto justify-center text-left gap-6'>
          <div className="1">
            <h4>Explore</h4>
            <ul className='mt-3'>
              {explore__links.map((item,index) => (
                  <li
                  key={index} 
                  className='font-medium text-[17px] leading-[200%] tracking-[-0.01em]'>
                    <a href={item.href} className='!text-white'>
                      {item.display}
                    </a>

                  </li>
              ))}            

            </ul>
          </div>
          <div className="2">
            <h4 className='text-nowrap'>Utility Pages</h4>
            <ul className='mt-3'>
              {utility__links.map((item,index) => (
                  <li
                  key={index} 
                  className='font-medium text-[17px] leading-[200%] tracking-[-0.01em]'>
                    <a href={item.href} className='!text-white'>
                      {item.display}
                    </a>

                  </li>
              ))}         

            </ul>

          </div>
          <div className="">
            <h4 className='text-nowrap'>Keep in Touch</h4>
            <div id="Address" className='flex mt-3 font-medium text-[17px] leading-[200%] tracking-[-0.01em]'>
                <h5 className="w-20 shrink-0">Address:</h5>
                <p>Mariendalsvej 50D 2 2000 Frederiksberg.</p>
            </div>
            <div id="Mail" className='flex font-medium text-[17px] leading-[200%] tracking-[-0.01em]'>
               <h5 className="w-20 shrink-0">Mail:</h5>
               <p>support@servicemarket.com</p>
            </div>
            <div id="Phone" className='flex font-medium text-[17px] leading-[200%] tracking-[-0.01em]'>
              <h5 className="w-20 shrink-0">Phone:</h5>
              <p>(+22) 123 - 4567 - 900</p>

            </div>
          </div>          
        </div>



      </div>

      <div id="copyright" className=' text-[18px] font-normal leading-[200%] tracking-[-0.5px] text-center items-center !bg-[#160813] py-6'>
        <p className=''>© 2023, ServiceMarket.dk | All rights reserved.</p>
      </div>
    </div>


    </>
  )
}

export default Footer