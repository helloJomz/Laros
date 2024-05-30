import { HandMetal } from "lucide-react";
import AlertToast from "../components/AlertToast";
import LoginForm from "../components/auth/LoginForm";
import { useAfterSignup } from "../hooks/useAfterSignup";

const LoginPage = () => {
  const { isVisible, setIsVisible } = useAfterSignup();

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
