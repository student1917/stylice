import Hero from '../shared/Hero'
import React, { useState } from 'react'
import Recommended from '../shared/Recommended'
import services from '../assets/data/service.js'
import ServiceCard from '../shared/ServiceCard'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { useEffect } from 'react'
import { Navigate, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import FilterPopup from '../pop-up/FilterPopup';



const getPageSize = () => {
    const width = window.innerWidth;
    if (width < 576) return 4
    if ( width < 1024) return 6;
    return 8; 
  };

const Service = () => {
        
    const [showPopup, setShowPopup] = useState(false);

    const handleClosePopup = () => {
        setShowPopup(false);        
      }   

    const handleOpenPopup = () => {
        setShowPopup(true)
    }

   

    useEffect (() => {
       
        if (showPopup) {
          document.body.classList.add('overflow-hidden')
        } else {
          document.body.classList.remove('overflow-hidden')
        }
        return () => {
          document.body.classList.remove('overflow-hidden')
        }
     },[showPopup])
   
    const [pageCount, setPageCount] =  useState(0)
    const [page, setPage] = useState(0)    
    const [pageSize, setPageSize] = useState(getPageSize())
    //
    
    const handleFilterApply = (newFilter) => {
       
        setSearchParams({
          ...searchParams,
          category: newFilter.category,
          minPrice: newFilter.minPrice,
          maxPrice: newFilter.maxPrice,
          page: 0, 
        });
      };
    //search 
    const [searchText, setSearchText] = useState('')
    //
    const [searchParams, setSearchParams] = useSearchParams()
    const name = searchParams.get('name') || ''
    const category=searchParams.get('category') || ''
    const minPrice = parseInt(searchParams.get('minPrice')) || '';
    const maxPrice = parseInt(searchParams.get('maxPrice')) || '';

    const {data:services, loading, error} = useFetch(`${BASE_URL}/service/search/getServiceByFilter?name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&pageSize=${pageSize}`)   

    const {data:serviceCount} = useFetch(`${BASE_URL}/service/search/getServiceFilterCount?name=${name}&category=${category}`)    
    
    const hasFilter = searchParams.has('name') || searchParams.has('category') || searchParams.has('minPrice') || searchParams.has('maxPrice');
    
    const searchHandler = () => {        
        if (searchText === '') {
            setSearchParams({})   
          } else {
            setSearchParams({ name: searchText })  
        }       
        setPage(0)
    }
 
    useEffect(()=>{
        const pageSize = getPageSize()
        const pages = Math.ceil(serviceCount/pageSize)
        setPageCount(pages)       
    }, [serviceCount, services])

    useEffect(() => {
        const handleResize = () => setPageSize(getPageSize());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      useEffect(() => {
        if (!searchParams.toString()) {
          setSearchParams({})
        }
      }, [])   

  return <>
    {showPopup && <FilterPopup onClose={handleClosePopup} onApply={handleFilterApply}/>}
    <div className="">
        <Hero/>
        <div className='flex justify-between w-[70%] mx-auto border my-12 h-14 items-center px-4 rounded-md bg-[#633B48] text-white'>
            <div className='flex gap-2 w-full'>
                <i className="ri-search-2-line"></i>
                <input type="text" placeholder='Service Name...' value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') searchHandler()
                  }}
                className='flex-1 outline-none !text-white font-bold ' />
            </div>            
            <i onClick={handleOpenPopup} className="ri-filter-line"></i>           
        </div>
        {!hasFilter && <Recommended/>}
        <div id="allservice__container" className= 'w-[90%] mx-auto my-12 '>
            <div id="heading__container">             
                <p className='!text-[#BA7894] font-semibold leading-[154%] tracking-[0.1em] text-center uppercase flex items-center justify-center'>
                Our Services
                </p>          
            
                <h2 className=''>All Services</h2>
                 <p className=''>Lorem ipsum dolor sit amet consectetur. Eu quis enim tempor et proin neque.</p>
            </div>
            <div className="w-[90%] my-12 mx-auto">               
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'> 
                    {services?.map((service, index) => (
                        <div key={service._id || index}>
                            <ServiceCard service={service} />    
                        </div>    
                    ))}                   
                </div>

                 {/*  */}
                <div className="w-full flex gap-2 h-16 justify-center mt-12">
                    {[...Array(pageCount).keys()].map(number=> (
                        <span key={number} onClick={()=>setPage(number)}
                        className={`h-10 w-10 cursor-pointer content-center border border-gray-200 text-xl ${page===number ? "bg-[#BA7894] text-white rounded-full":"rounded-full"}`}
                        >
                            {number+1}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Service