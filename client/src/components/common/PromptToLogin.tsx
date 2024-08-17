import { Button } from "../ui/button";
import { IoClose } from "react-icons/io5";
import { BiLogInCircle } from "react-icons/bi";
import { useNavbarContext } from "@/context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/features/auth/authSlice";

const PromptToLogin = () => {
  const { setShowPromptToLogin, showPromptToLogin } = useNavbarContext();
  const { userid } = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleCloseShowPromptToLogin = () => {
    setShowPromptToLogin(false);
  };

  const handleRedirectToLogIn = () => {
    setShowPromptToLogin(false);
    navigate("/login", { state: { from: "/" } });
  };

  const handleRedirectToSignUp = () => {
    setShowPromptToLogin(false);
    navigate("/signup", { state: { from: "/" } });
  };

  return (
    <>
      {showPromptToLogin && !userid && (
        <div className="fixed w-fit top-20 left-0 right-0 mx-auto bg-background border border-muted p-4 rounded shadow-lg z-[9999]">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center border-b-2 border-muted pb-2">
              <div className="flex gap-x-1 items-center">
                <BiLogInCircle />
                <h1 className="font-semibold text-sm">Log In to Continue</h1>
              </div>
              <div
                className="rounded-full p-0.5 cursor-pointer hover:bg-muted"
                onClick={handleCloseShowPromptToLogin}
              >
                <IoClose />
              </div>
            </div>
            <div className="text-sm">
              <span>
                You are not logged in, so you cannot use this feature.
              </span>
            </div>
            <div className="flex gap-x-2 justify-end items-center">
              <Button
                className="text-xs bg-slate-50 text-black hover:text-white"
                onClick={handleRedirectToSignUp}
              >
                Create an account
              </Button>
              <Button className="text-xs" onClick={handleRedirectToLogIn}>
                Log In
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromptToLogin;
