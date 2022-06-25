import React, { useEffect, useState } from "react";

const useChangeWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleChangWidth = () => {
      setWidth(window.innerWidth);
    };
    handleChangWidth();
    window.addEventListener("resize", handleChangWidth);
    return () => {
      window.removeEventListener("resize", handleChangWidth);
    };
  }, [width]);

  return width;
};

export default useChangeWidth;
