import React from 'react'
import Countdown from 'react-countdown';

const CountdownTimer = ({targetDate}) => {

    const renderer = ({ days, hours, minutes, seconds, completed }) =>{
        if (completed) return <span>Sale ended!</span>;

        const timeUnits = [
          { label: 'Days', value: days },
          { label: 'Hours', value: hours },
          { label: 'Minutes', value: minutes },
          { label: 'Seconds', value: seconds },
        ]

        return (
            <div className="flex justify-center gap-1 text-center">
              {timeUnits.map((item, index) => (
                <React.Fragment key = {index} className="flex flex-col">
                  <div className="">
                    <div className='h-12 w-12 border border-[#F1F2F9] content-center rounded-xl shadow-[inset_0px_-3px_1.8px_0px_#96A1AC33] '>{item.value}</div>
                    <div className='text-xs'>{item.label}</div>
                  </div>             
                {index < timeUnits.length - 1 && (
                  <div className=" text-back h-12 content-center">:</div>
                )}
                </React.Fragment>
              ))}
              </div>
        )
    }
    
  return <Countdown date={targetDate} renderer={renderer} />;
  
}

export default CountdownTimer