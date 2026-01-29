import React from 'react'
import {Link, useMatch} from 'react-router-dom'

const ServiceCard = ({service}) => {


    const{_id, name, averageRating, reviewCount, shortDesc, image } = service

    const isBooking = useMatch('/booking/:id'); 

  return (
    <div id="service__card" className='shadow-[0px_4px_16px_0px_#00000040] border border-[#0000003D] overflow-hidden rounded-[24px]'>
        <div id="service__img">
            <img src={image} alt="" className=' w-full object-cover rounded-tr-2xl rounded-tl-2xl aspect-[3/2]'/>
        </div>
        <div id="service__body">
            <div id="card__top" className='flex w-[90%] mx-auto my-2 justify-between gap-4'>
                <span className='flex'><i className="ri-star-line"> </i>{averageRating}</span>
                <span className='flex gap-1'>{reviewCount} <span className='hidden lg:flex'>Reviews</span></span>                             

            </div>
            <div id="service__info" className='w-[90%] mx-auto mb-3'>
                <h4 className='text-left text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis'>{name}</h4>
                <div className="text-left clamp-2 min-h-[48.8px]">
                    <i className="ri-magic-fill text-yellow-500"></i> {shortDesc}
                </div>
            </div>          
        </div>
        {/* <button className='w-[90%] !bg-[#BA7894] rounded-xl text-white'>
                <Link to={`/services/${id}`}>Book Now</Link>                
        </button> */}
        {!isBooking && <Link to={`/services/${_id}`} className='w-[95%] sm:w-[90%] block mx-auto '>
            <button className='w-full border border-[#BA7894] rounded-xl text-white mb-6 font-display !text-lg !text-[#BA7894] hover:!bg-[#BA7894] hover:!text-white focus:!bg-[#BA7894] focus:!text-white'>
                    Book Now
            </button>
        </Link>  

        }
         {/* <Link to={`/services/${id}`} className='w-[95%] sm:w-[90%] block mx-auto '>
            <button className='w-full !bg-[#BA7894] rounded-xl text-white mb-6'>
                    Book Now
            </button>
        </Link>   */}
    
    </div>
  )
}

export default ServiceCard