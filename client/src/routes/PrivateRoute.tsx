import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = (children: PrivateRouteProps) => {
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
