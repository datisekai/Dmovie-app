import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import useChangeWidth from "./useChangeWidth";

const useSlidesView = () => {
  const width = useChangeWidth();
  const [slides, setSlides] = useState(5);

  useEffect(() => {
    if (width > 1024) {
      setSlides(5);
    } else if (width > 768) {
      setSlides(3.5);
    } else if (width > 500) {
      setSlides(3);
    } else if (width > 350) {
      setSlides(2.5);
    } else {
      setSlides(2);
    }
  }, [width]);
  return slides;
};

export default useSlidesView;
