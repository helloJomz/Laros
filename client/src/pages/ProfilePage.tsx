import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { displayname } = useParams();

  return (
    <div>
      <h1>{displayname}</h1>
    </div>
  );
};

export default ProfilePage;
