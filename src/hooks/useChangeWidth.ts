import React, { useEffect, useState } from 'react'

const useChangeWidth = () => {

    const [width, setWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleChangWidth = () => {
            setWidth(window.innerWidth);
          };
      
        window.addEventListener('resize',handleChangWidth);
        return () => {
            window.removeEventListener('resize',handleChangWidth);
        }
    },[width]);

    return width;
 
}

export default useChangeWidth