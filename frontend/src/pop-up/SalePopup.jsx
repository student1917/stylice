import React, {useState} from 'react'
import re02 from '../assets/images/recom-2.png'
import CountdownTimer from './CountdownTimer';

const SalePopup = ({ onClose }) => {

    const targetTime = Date.now() + 5000 * 60 * 1000;
   

  return (
    <div className="fixed inset-0 justify-center items-center z-50 flex ">
        <div className="absolute inset-0 bg-black/40" />
        <div id="container" className='relative grid sm:grid-cols-[40%_60%] bg-white w-[80%] lg:w-[60%] 2xl:w-[40%] rounded-3xl overflow-hidden'>
            <div id="img">
                <img src={re02} alt="" className='h-full w-full object-cover'/>
            </div>
            <div id="content_container" className='bg-white'>
                <div className="text-right">
                <button onClick={onClose}><i className="ri-close-large-line text-gray-400"></i></button>
                </div>
                <div className="">
                    <h2>Get 50% Off 🔥</h2>
                    <p className='mb-2'>For new member</p>
                </div>
                
                {/*   */}
                <CountdownTimer targetDate={targetTime} />
                <div className="flex flex-col items-center ">
                    <div className="border border-[#F1F2F9] w-[80%] justify-center mt-6 mb-2 py-2 mx-6 rounded-md">
                        <i className="ri-phone-fill text-[#BA7894] mr-2"></i>
                        <input type="phone" placeholder='Enter your phone number'/>
                    </div>
                    <button className='w-[80%] text-white bg-gradient-to-b from-[#ECBFD3] to-[#BA7894] rounded-md mb-12'>Get discount</button>
                </div>
             
            </div>
        </div>
    </div>
   
  )
}

export default SalePopup