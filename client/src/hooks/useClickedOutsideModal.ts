import { useEffect, useRef } from "react";
import { useModal } from "./useModal";

const useClickedOutsideModal = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { setModalOpen } = useModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setModalOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [componentRef, setModalOpen]);

  return {
    componentRef,
  };
};

export default useClickedOutsideModal;
