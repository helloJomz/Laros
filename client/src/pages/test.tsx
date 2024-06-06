import { Button } from "@/components/ui/button";
import { useTestMutation } from "@/app/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { destroyUserSession } from "@/app/features/auth/authSlice";
import { persistor } from "@/app/store";
import { useNavigate } from "react-router-dom";

const test = () => {
  const [test] = useTestMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    test(); // Call the hook inside the component correctly
  };

  const handleLogout = () => {
    dispatch(destroyUserSession());
    persistor.flush();
    persistor.purge();
    navigate("/");
  };

  return (
    <div className="pt-4">
      <Button onClick={handleClick}>test 403</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default test;
