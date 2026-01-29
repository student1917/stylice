import React from 'react'

const Overview = ({service}) => {

  if (!service) return <div>Service not found</div>
 
  return (
    <div className="text-left mb-8">
        <h2 className='font-bold'>Description</h2>        
        <h4 className='font-bold'>Service Description</h4>
        <p>{service.desc}</p>
        <h4 className='font-bold'>Terms of Use:</h4>
        <p>{service.terms}</p>
        <h4 className='font-bold'>Benefits</h4>
        <ul>
          {service?.benefits?.map((line, index)=> (
            <li key={service._id || index}>{line}</li>
          ))}
      
        </ul>
    </div>
  )
}

export default Overview