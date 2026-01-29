import React from 'react'
import { useState, useEffect, useRef } from 'react'


const LanguageSwitcher = () => {
    const [currentLang, setCurrentLang] = useState("EN");
    const [open, setOpen] = useState(false)
    const languages = ["EN" , "VI"]

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  return (
    <div className="relative" ref={dropdownRef}>
        <button onClick={() => setOpen(!open)} >       
            {currentLang} <span><i className="ri-arrow-down-wide-line"></i></span>
        </button>
        { open && (
            <ul className='absolute z-10 right-0 bg-gray-50 py-2 px-6'>
                {languages.map((lang)=> (
                    <li
                    key={lang}
                    onClick={()=> {
                        setCurrentLang(lang);
                        setOpen(false);
                    }}
                    className='font-medium py-1'>                    
                        {lang}
                    </li>
                ))}
            </ul>              
        ) }
    </div>
  )
}

export default LanguageSwitcher