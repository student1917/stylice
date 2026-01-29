import React from 'react'
import user from '../assets/images/user.jpg'

const ReviewCard = ({review}) => {
  return (
    <div className="flex flex-col min-h-[300px]">
        <div id="avatar" className='flex justify-between'>
            <img src={review?.avatar || user} alt="" className='w-[20%]'/>
            <span className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                    <i
                    key={index}
                    className={
                        index + 1 <= Math.floor(review.rating)
                        ? 'ri-star-fill'
                        : index + 0.5 <= review.rating
                        ? 'ri-star-half-line'
                        : 'ri-star-line'
                    }
                    />
                ))}                  
            </span>
        </div>
        <div className="text-left font-bold text-xl py-3">{review.username}</div>
        <div className="text-left">{review.reviewText}</div>
    </div>
  )
}

export default ReviewCard