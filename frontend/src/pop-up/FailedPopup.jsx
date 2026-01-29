import React from 'react'
import failedIcon from '../assets/images/failed-icon.png'
import { Link } from 'react-router-dom'

const FailedPopup = ({onClose}) => {
  return (
    <div className="fixed inset-0 justify-center items-center z-50 flex  ">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex flex-col justify-center items-center bg-white p-12">
          <div className="absolute top-0 right-0">
            <button onClick={onClose}><i className="ri-close-large-line text-gray-400"></i></button>
          </div>
            <img src={failedIcon} alt="" className='bg-[#ECBFD3] rounded-full h-20 w-20 '/>
            <h2 className='text-[#BA7894] !text-xl md:!text-3xl pt-4 '>Your order failed</h2>
            <p className='pb-8'>We encountered an issue while creating the employee account. <br/> Unfortunately, the account creation process has failed.</p>
            <div id="button__group" className='flex justify-center gap-2'>
              <Link to='/home' className='' >
                <button onClick={onClose} className='border border-[#BA7894] rounded-md'>Home</button>
              </Link>
              <button onClick={onClose} className='border !bg-[#BA7894] rounded-md text-white'>Close</button>
            </div>
        </div>

    </div>
  )
}

export default FailedPopup