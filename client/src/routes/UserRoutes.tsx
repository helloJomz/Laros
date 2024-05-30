import { Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/user" element={<ProfilePage />} />
    </Routes>
  );
};

export default UserRoutes;
