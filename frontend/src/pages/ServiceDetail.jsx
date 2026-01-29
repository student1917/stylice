import React, { useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import services from '../assets/data/service.js'
import {Link} from 'react-router-dom'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  } from "../components/ui/tabs"

import Recommended from '../shared/Recommended.jsx'
import Overview from '../shared/Overview.jsx'
import Review from '../shared/Review.jsx'
import useFetch from '../hooks/useFetch.js'
import { BASE_URL } from '../utils/config'


  

export const ServiceDetail = () => {
  
    const {id} = useParams();
    //console.log("ID:", id);
    //const service = services.find((s) => s.id===id) 
    const {data:service, loading, error} = useFetch(`${BASE_URL}/service/${id}`) 
    
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const bookingHandle = async e=> {
      e.preventDefault()
      try {

        if (!isLoggedIn)
          return alert('Please sign in to book service')

        navigate(`/booking/${id}`)
        

      } catch (err) {

      }
    }

  return (
    <>
    <div className="flex flex-col w-[90%] mx-auto">
        <div id='top' className="">
            <div className="flex justify-between">                
              <h4 className='text-left text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis !text-2xl'>{service.name}</h4>
              <span className='w-[20%] font-bold'>{service?.price}</span>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-1">
                    <span className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <i
                        key={service.id || index}
                        className={
                            index + 1 <= Math.floor(service.averageRating)
                            ? 'ri-star-fill'
                            : index + 0.5 <= service?.averageRating
                            ? 'ri-star-half-line'
                            : 'ri-star-line'
                        }
                        />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">{service?.averageRating}</span>
                    <span className='flex gap-1 text-black'>({service?.reviewCount}) </span> 
                    </span>
                   
                </div>
                {/* <Link to={`/booking/${id}`} className='w-[20%]'> */}
                  <button onClick={bookingHandle}
                  className='w-[20%] !bg-[#BA7894] rounded-xl text-white text-xs sm:text-base flex justify-center' >
                          Book Now
                  </button>
                {/* </Link>   */}
            </div>                          

        </div>
        <div id='gallery' className=" ">
        <div className="gallery__container my-6 py-4  ">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 object-cover">
                <div className="relative overflow-hidden rounded-none rounded-tl-3xl rounded-bl-3xl">
                  <img src={service?.gallery?.[0]} alt="" className='w-full h-full' />
                </div>
                <div className="flex flex-col content-center gap-4">
                  <img src={service?.gallery?.[1]} alt="" className='w-full h-1/2 object-cover' />
                  <img src={service?.gallery?.[2]} alt="" className="w-full h-1/2 object-cover" />
                </div>

                <div className="block sm:hidden md:hidden lg:flex flex-col lg:flex-col gap-4 content-center overflow-hidden rounded-none rounded-tr-3xl rounded-br-3xl ">                  
                  <img src={service?.gallery?.[3]} alt="" className='w-full h-1/2 object-cover'/>
                  <img src={service?.gallery?.[4]} alt="" className='w-full h-1/2 object-cover mt-4 sm:mt-0'/>
                </div>  

                <div className="hidden sm:block lg:hidden">
                  <img src={service?.gallery?.[3]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:block lg:hidden">
                  <img src={service?.gallery?.[4]} alt="" className="w-full h-full object-cover" />
                </div>                
              </div>
            </div>
        </div>

        {/* Overview + Recommended + Review   */}
        <div className="">
            <Tabs defaultValue = "overview">
                <TabsList>
                    <TabsTrigger value = 'overview'>Overview</TabsTrigger>
                    <TabsTrigger value = 'recommended'>Recommended</TabsTrigger>
                    <TabsTrigger value = 'review'>Review</TabsTrigger>
                </TabsList>
                
                <TabsContent value='overview'>                   
                    <Overview service={service}/>                   
                </TabsContent>
                
                <TabsContent value='recommended'>                   
                    <Recommended/>
                </TabsContent>

                <TabsContent value='review'>                   
                    <Review service={service}/>
                </TabsContent>
            </Tabs>
        </div>

    </div>
    
    </>
  )
}

export default ServiceDetail
