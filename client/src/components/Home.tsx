import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/features/auth/authSlice";

const Home = () => {
  const user = useSelector(selectCurrentUser);
  const displayname = user
    ? user.displayname
    : `user${localStorage.getItem("anon_uuid")}`;

  return (
    <>
      <div className="p-2">{displayname}</div>
    </>
  );
};

export default Home;
