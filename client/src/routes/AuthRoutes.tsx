import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import PrivateRoute from "./PrivateRoute";
import Navbar from "../components/Navbar";

const AuthRoutes = () => {
  return (
    <Routes>
      {/* <Route element={<Navbar />}></Route> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AuthRoutes;
