import { useEffect, useRef, RefObject } from "react";

const useClickedOutside = (
  callback: () => void
): { componentRef: RefObject<HTMLDivElement> } => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return { componentRef };
};

export default useClickedOutside;
