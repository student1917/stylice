import React, {useMemo, useRef} from 'react'
import ReviewCard from './ReviewCard'
import reviews from '../assets/data/reviews';
import Slider from "react-slick";
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config'



const Review = ({service}) => {

    const sliderRef2 = useRef();

    const settings_1 = {
    
        infinite: true,
        autoplay: false,
        speed: 700,
        swipeToSlide: true,
        slidesToShow: 3,  
    
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true,        
             
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576, 
            settings: {
              slidesToShow: 1,
            },
          },
        ]
        
      };


    
      const reviews = service.reviews

  return (
    <div className="">        


      <div className="text-left ">
          <h2>Our Customer Feedback</h2>            
          
          <div className="flex justify-between mb-4">
              <span className='text-sm md:text-base content-center'>Don’t take our word for it. Trust our customers</span> 
              <div className="flex gap-2 md:gap-4">             
                  
                <button onClick={() => sliderRef2.current.slickPrev()} className='content-center border border-[#422A3C] rounded-sm !text-sm md:!text-base'>
                  <i className="ri-arrow-left-s-line"></i>                    
                  {/* <span className='hidden sm:block'>Previous</span> */}
                  </button>              
                  
                <button onClick={() => sliderRef2.current.slickNext()} className='border border-[#422A3C] rounded-sm !text-sm md:!text-base flex-nowrap'>
                  {/* <span className='hidden sm:block'>Next</span> */}
                  <i className="ri-arrow-right-s-line"></i></button>
              </div>
            
          </div>

          <div className="w-full overflow-hidden">
            {reviews.length <= 1 ? (
              <div className="px-4 py-4">
                {reviews.map((item, index) => (
                  <ReviewCard key={index} review={item} />
                ))}
              </div>
            ) : (
              <Slider ref={sliderRef2} {...settings_1}>
                {reviews.map((item, index) => (
                  <div className="px-4 py-4" key={index}>
                    <ReviewCard review={item} />
                  </div>
                ))}
              </Slider>
          )}
          </div>

            
        </div>
    </div>
  )
}

export default Review