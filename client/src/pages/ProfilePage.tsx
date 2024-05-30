import { Button } from "../components/ui/button";
import { useUserContextProvider } from "../context/UserProvider";

const ProfilePage = () => {
  const { fullname, firstname } = useUserContextProvider();
  return (
    <div className="text-white">
      <h1>{fullname}</h1>
      <Button>Test</Button>
    </div>
  );
};

export default ProfilePage;
