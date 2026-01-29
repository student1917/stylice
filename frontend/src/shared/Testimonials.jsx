import React from 'react'
import testimonialImg from '../assets/images/testimonialImg.png'

const Testimonials = () => {
  return (    
    <>
        <div className="testimonials__section bg-testimonials w-full pb-4  ">
            <div className="">
                <p className='!text-[#BA7894] font-semibold leading-[154%] tracking-[0.1em] text-center uppercase flex items-center justify-center pt-8'>
                    TESTIMONIALS
                </p>      
                <h2>What our Customers says...</h2>
            </div>
            <div className="team__section flex flex-col lg:flex-row bg-[#422A3C] rounded-[40px] lg:py-24 mt-8 sm:mt-16 mx-4 sm:mx-28 py-12 px-6 justify-center">
                <div className="flex flex-col lg:flex-row w-[100%] xl:w-[70%] 2xl:w-[70%] items-center h-full  ">
                    <div className="testimonials__img flex w-[100%] 2xl:w-[70%] justify-center">
                        
                        <img src={testimonialImg} alt="" className="object-cover w-[50%] lg:w-full "/>
                    </div>
                    <div id='testimonials__content' className="items-center lg:mx-12 justify-center lg:justify-start  text-[#EDFFF0]  sm:text-center lg:text-left">
                        <h4 >Leslie Alexander</h4>
                        <h4>Moncton, Canada</h4>
                        <h3 className='!text-white font-display text-xl lg:text-[36px] font-semibold sm:leading-[44px] tracking-[-0.72px] mt-4 mb-2'>Neque porro quisquam est qui dolum</h3>
                        <p className='text-sm sm:text-base !text-justify'>“ It is a long established fact that a reader will be tracked distracted by 
                            the readable content of a page is when looking at its layout.
                            The point of using Lorem of distribution it look like readable English “</p>
                    </div>
                </div>
            
            </div>
            <div id='button__group' className="flex justify-center items-center gap-4 mt-4">
                <button className=" flex w-12 h-12 justify-center items-center rounded-full">
                    <i className="ri-arrow-left-s-line"></i>
                </button>
                <button className='flex justify-center items-center w-12 h-12 rounded-full'>
                    <i className="ri-arrow-right-s-line "></i>
                </button>
            
            </div>

        </div>
    </>
  )
}

export default Testimonials

