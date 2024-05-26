import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HandMetal } from "lucide-react";
import AlertToast from "../components/AlertToast";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
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

  return (
    <div>
      <LoginForm />

      {isVisible && (
        <AlertToast
          title="Welcome to Laros!"
          desc="Your account has been successfully created. Please log in to get started."
          icon={<HandMetal size={30} />}
          onClick={() => setIsVisible(false)}
        />
      )}
    </div>
  );
};

export default LoginPage;
