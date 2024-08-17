import React, { useEffect, useRef, useState } from "react";

const useResizeImage = <T extends HTMLImageElement>(
  screenSize: number
): [React.RefObject<T>, string] => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    if (screenSize <= 768) {
      setSize("px-3");
    }

    const updateSize = () => {
      if (ref.current) {
        const height = ref.current.offsetHeight;
        setSize(height >= 300 && height <= 1000 ? "px-24" : "px-7");
      }
    };
    updateSize();
  }, [ref.current]);

  return [ref, size];
};

export default useResizeImage;
