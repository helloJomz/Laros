import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/features/auth/authSlice";

const Home = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <div>
      {user ? `Hi, ${user.firstname} ${user.lastname}!` : "Welcome to Laros!"}
    </div>
  );
};

export default Home;
