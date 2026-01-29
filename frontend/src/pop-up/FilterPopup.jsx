import React, {useState} from 'react'
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config'
import Slider from 'rc-slider';

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import 'rc-slider/assets/index.css';




const FilterPopup = ({onClose, onApply}) => {   
    
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000);    

    const [minInput, setMinInput] = useState(minPrice.toString());
    const [maxInput, setMaxInput] = useState(maxPrice.toString());   

    const {data:categories, loading, error} = useFetch(`${BASE_URL}/category`)    
    const [selectedCategory, setSelectedCategory] = useState('');
    
    // const [value, setValue] = useState(0)
    const STEP = 1
    const roundToStep = (value) => Math.round(value / STEP) * STEP;

    const setPriceRange = (min, max) => {
      setMinPrice(roundToStep(min));
      setMaxPrice(roundToStep(max));
      setMinInput(String(min));
      setMaxInput(String(max));
    };


    const handleMinInputChange = (e) => {
      setMinInput(e.target.value);
    };
  
    const handleMaxInputChange = (e) => {
      setMaxInput(e.target.value);
    };
  
    const handleMinInputBlur = () => {
      const val = roundToStep(Number(minInput));
      if (!isNaN(val) && val <= maxPrice) {
        setMinPrice(val);
        setMinInput(val.toString());
      }
    };
  
    const handleMaxInputBlur = () => {
      const val = roundToStep(Number(maxInput));
      if (!isNaN(val) && val >= minPrice) {
        setMaxPrice(val);
        setMaxInput(val.toString());
      }
    }; 
    

  return (
    <div className="fixed inset-0 justify-center items-center z-50 flex ">
        <div className="absolute inset-0 bg-black/40" onClick={onClose}/>  
        <div className='flex flex-col text-left space-y-2 mb-8 bg-white w-[80%] lg:w-[60%] 2xl:w-[40%] rounded-3xl px-6 py-6 z-1'>
            <h2>Filter</h2>
            <h4>Category</h4>
            <div className="grid md:grid-cols-2 gap-2">
                {categories.map((category, index)=>(
                
                <label key={category._id || index} className="flex flex-nowrap items-center cursor-pointer transition-colors">
                    <input type="radio" name="category" value={category.name}
                        checked={selectedCategory === category.name}
                        onChange={(e)=>setSelectedCategory(e.target.value)}
                        className='mr-2 h-6 w-6 accent-[#BA7894] '
                    />
                    <span className='text-lg text-[#422A3C] font-medium'>{category.name}</span>
                </label>  
                                   
                ))}
            </div>
            <div className="flex justify-between my-6">
            <h4>Price</h4>
                <div id="price__range" className='space-x-3'>
                    <input type="number" 
                    value={minInput}
                    onChange={handleMinInputChange}
                    onBlur={handleMinInputBlur}
                    placeholder='0' 
                    className='border border-gray-300 rounded-md max-w-20 min-h-10 text-center' />
                    <span className='text-gray-500'>-</span>
                    <input type="number" 
                    placeholder='10.000.000' 
                    value={maxInput}
                    onChange={handleMaxInputChange}
                    onBlur={handleMaxInputBlur}
                    className='border border-gray-300 rounded-md max-w-20 min-h-10 text-center' />
                </div>
            </div>
          
            <Slider
                range
                min={0}
                max={10000000}
                value={[minPrice, maxPrice]}
                onChange={([newMin, newMax]) => {
                  setPriceRange(newMin, newMax)
                }}
                tipFormatter={value => `${value}`} 
                trackStyle={{ backgroundColor: '#ECBFD3', height: 12 }}                
                handleStyle={{
                    borderColor: '#BA7894',
                    backgroundColor: '#fff',
                    borderWidth: 2,
                    height: 20,
                    width: 20,
                    marginTop: -4,
                  }}
                  railStyle={{ backgroundColor: '#e5e5e5', height: 12 }}
                  handleRender={(node, handleProps) => (
                    <Tooltip
                    //   overlay={`${handleProps.value.toLocaleString()} VND`}
                    // overlay={`${Math.round(handleProps.value / 10000) * 10000} VND`}
                    overlay={`${(Math.round(handleProps.value / 10000) * 10000).toLocaleString('vi-VN')} VND`}

                      visible={handleProps.dragging}
                      placement="top"
                      overlayInnerStyle={{
                        fontSize: 12,
                        padding: '4px 8px',
                        color: '#000',
                        background: "#fff",
                      }}
                      overlayClassName="!z-50"
                    >
                      {node}
                    </Tooltip>
                  )}
            />


            <div id="btn__group" className='flex items-center justify-center gap-2 mt-6 w-full md:w-[50%] mx-auto'>
                <button onClick={onClose} className='border border-[#ECBFD3] rounded-md min-w-16 flex-1 text-[#BA7894] font-display lg:!text-xl'>Cancel</button>
                <button onClick={()=>{
                    onApply({
                        category:selectedCategory,
                        minPrice:minPrice,
                        maxPrice:maxPrice
                    })
                    onClose()
                }} 
                className='border border-[#ECBFD3] rounded-md flex-1 !bg-[#BA7894] text-white font-display lg:!text-xl'>Apply</button>
            </div>

        </div>
    
    </div>
  )
}

export default FilterPopup