import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAfterSignup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(location.state?.success);

  useEffect(() => {
    if (location.state?.success) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [isVisible]);

  return {
    isVisible,
    setIsVisible,
  };
};
