import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/features/auth/authSlice";
import { usePageTabName } from "@/hooks/usePageTabName";

const Home = () => {
  const user = useSelector(selectCurrentUser);
  const displayname = user
    ? user.displayname
    : `user${localStorage.getItem("anon_uuid")}`;

  usePageTabName({ tabName: "Laros | Home" });

  return (
    <>
      <div className="p-2">{displayname}</div>
    </>
  );
};

export default Home;
