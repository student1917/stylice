import React from 'react'

const ReviewPopup = ({ onClose }) => {
  return <>
    <div className="fixed inset-0 justify-center items-center z-50 flex ">
        <div className="absolute inset-0 bg-black/40" />  
        <div className='flex flex-col text-left space-y-2 mb-8 bg-white w-[80%] lg:w-[60%] 2xl:w-[40%] rounded-3xl px-6 py-6 z-1'>
            <h2  className='text-left'>Review</h2>
            <h4>Service</h4>
            <input type="text" placeholder='' className='border border-gray-300 rounded-md min-h-10' />
            <h4>Rating</h4>
            <span className='border border-gray-300 rounded-md py-1 pl-2 space-x-1'>
            <i className="ri-star-fill text-2xl"></i>
            <i className="ri-star-fill text-2xl"></i>
            <i className="ri-star-fill text-2xl"></i>
            <i className="ri-star-fill text-2xl"></i>
            <i className="ri-star-fill text-2xl"></i>
            </span>
            <h4>Description</h4>
            <textarea type="text" placeholder='What is your thought?' className='border border-gray-400 !text-gray-500 rounded-md min-h-30'/>
            <div id="btn__group" className='flex items-center justify-center gap-2 mt-6 w-full md:w-[50%] mx-auto'>
                <button onClick={onClose} className='border border-[#ECBFD3] rounded-md min-w-16 flex-1 text-[#ECBFD3] font-display lg:!text-xl'>Cancel</button>
                <button className='border border-[#ECBFD3] rounded-md flex-1 !bg-[#ECBFD3] text-white font-display lg:!text-xl'>Create</button>
            </div>
        </div>

    </div>

    </> 

}

export default ReviewPopup