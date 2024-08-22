import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ auth }: { auth: string }) => {
  const location = useLocation();
  return auth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

const AnonymousRoute = ({ auth }: { auth: string }) => {
  return !auth ? <Outlet /> : <Navigate to="/" replace />;
};

// const RoleAccess = ({ roles = [], user, redirectTarget }) => {
//   return !roles.length || roles.includes(user?.role)
//     ? <Outlet />
//     : <Navigate to={redirectTarget} replace />;
// };

// const RoleAccess = ({ roles = [], user, redirectTarget }) => {
//   return !roles.length || roles.includes(user?.role)
//     ? <Outlet />
//     : <Navigate to={redirectTarget} replace />;
// };

export { PrivateRoute, AnonymousRoute };
