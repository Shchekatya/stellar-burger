import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";


export const ProtectedRouteElement = ({ children }) => {
  let cookie = getCookie("refreshToken"); 
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const location = useLocation();
  if (!isLogged && !cookie) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};
