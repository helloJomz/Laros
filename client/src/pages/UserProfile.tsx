import { useParams } from "react-router-dom";

const UserProfile = () => {
  let params = useParams();

  console.log(params);
  return <div>hi</div>;
};

export default UserProfile;
