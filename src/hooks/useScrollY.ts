import React, { useEffect, useState } from 'react'

const useScrollY = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleScrollY = () => {
        setHeight(window.scrollY);
    }

    window.addEventListener('scroll',handleScrollY);

    return () => {
        window.removeEventListener('scroll', handleScrollY);
    }
  },[height])
  return height;
}

export default useScrollY