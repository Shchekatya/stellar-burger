import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";


export const ProtectedRouteElement = ({ children }) => {
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const location = useLocation();
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};
