import React from 'react'

const SearchBar = () => {
  return (
    <div className="search__bar flex mt-6 w-full max-w-[800px] 2xl:max-w-[950px]">
        {/* form >md */}
        <form className='hidden sm:flex flex-nowrap  md:flex-row sm:gap-2 w-full bg-white rounded-[61.33px] items-center justify-between text-sm sm:text-base'>

            <div className="flex-2 flex-col  ml-6 my-4">
                <h6 className='text-sm sm:text-base'>Service Name</h6>           
                <div className="relative">
                    <input type="text" placeholder='Book your services...' 
                    className='w-full px-4 border-b pl-0 outline-none text-sm 2xl:text-base'/>
                    <i className="ri-search-2-line absolute right-0 bottom-1"></i>
                </div>   
            </div>
            <div className="flex-2 flex-col mx-6 my-4">                
                <h6 className=''>Address</h6>           
                <div className="relative underline">
                    <input type="text" placeholder='Where' 
                    className='w-full px-4 border-b pl-0 outline-none text-sm 2xl:text-base'/>
                    <i className="ri-map-pin-line absolute right-0 bottom-1"></i>
                </div>   
            </div>
            <button className='hidden md:block !bg-[#BA7894] rounded-3xl text-white m-1 sm:ml-auto'>                
                    Search
                    <span className='pl-4 ' type='submit'>
                        <i className="ri-search-line"></i>
                    </span>
            </button>
            <button className='block md:hidden !bg-[#BA7894] rounded-3xl text-white'>                
                        
                        <span className='' type='submit'>
                            <i className="ri-search-line"></i>
                        </span>
            </button>
        </form>
        {/* form<md */}
        
        <form className='block sm:hidden flex sm:gap-6 w-full bg-white rounded-3xl items-center text-sm sm:text-base justify-center py-2 pl-8'>
            <div className="flex-col flex-1 flex">
                <div className="">
                    <h6 className='text-sm sm:text-base'>Service Name</h6>           
                    <div className="pb-4">
                        <input type="text" placeholder='Book your services...' 
                        className='border-b outline-none w-[90%]'/>
                        <i className="ri-search-2-line absolute"></i>
                    </div>   
                </div>
                <div className="">
                    <h6 className=''>Address</h6>           
                    <div className="relative underline">
                        <input type="text" placeholder='Where' 
                        className=' border-b  outline-none  w-[90%] '/>
                        <i className="ri-search-2-line absolute"></i>
                    </div>   
                </div>
            </div>
            <div className="">
                <button className='!bg-[#BA7894] rounded-3xl text-white'>                
                        
                        <span className='' type='submit'>
                            <i className="ri-search-line"></i>
                        </span>
                </button>
            </div>
        </form>

    </div>
  )
}

export default SearchBar