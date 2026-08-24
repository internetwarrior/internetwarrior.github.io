import { useEffect, useState } from "react";
import { useDomRefs } from "../app/context/RefContext";

function Hero({ images = [], className = "", ...props }) {
  const { hero } = useDomRefs();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleRightClick = (e) => {
      e.preventDefault();

      if (images.length <= 1) return;

      setIndex((prev) => (prev + 1) % images.length);
    };

    window.addEventListener("contextmenu", handleRightClick);

    return () => {
      window.removeEventListener("contextmenu", handleRightClick);
    };
  }, [images]);

  if (!images.length) return null;

  return (
    <div>
      <img
        ref={hero}
        src={images[index]}
        className={`w-full h-full fixed object-cover main-filter z-[10] animate-levitate ${className}`}
        {...props}
      />
    </div>
  );
}

export default Hero;
