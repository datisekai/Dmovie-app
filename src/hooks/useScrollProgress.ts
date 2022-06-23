import React, { useEffect, useState } from 'react'

const useScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            if(scrollHeight)
            {
              setProgress((Number((scrollY/scrollHeight).toFixed(2))) * 100)
            }
        }
        window.addEventListener('scroll',handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    },[progress])

    return progress;
}

export default useScrollProgress