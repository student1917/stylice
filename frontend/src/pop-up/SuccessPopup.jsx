import React from 'react'
import successIcon from '../assets/images/success-icon.png'
import { Link } from 'react-router-dom'

const SuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 justify-center items-center z-50 flex  ">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex flex-col justify-center items-center bg-white p-12">
          <div className="absolute top-0 right-0">
            <button onClick={onClose}><i className="ri-close-large-line text-gray-400"></i></button>
          </div>
            <img src={successIcon} alt="" className='bg-[#ECBFD3] rounded-full h-20 w-20 '/>
            <h2 className='text-[#BA7894] !text-xl md:!text-3xl pt-4 pb-8'>Your order has been placed!</h2>
            <div id="button__group" className='flex justify-center gap-2'>
              <Link to='/home' className='' >
                <button className='border border-[#BA7894] rounded-md'>Home</button>
              </Link>
              <button onClick={onClose} className='border !bg-[#BA7894] rounded-md text-white'>Close</button>
            </div>
        </div>

    </div>
    
  )
}

export default SuccessPopup