import React from "react";
import { ReactNode } from "react";
import { Navigate, Outlet, Route, useLocation,RouteProps } from "react-router-dom";
import { useSelector } from "../../services/hooks/hooks";
import rootReducer from "../../services/reducers/root-reducer";
import { getCookie } from "../../utils/cookie";


export type TChildren = {
  children: JSX.Element
}& RouteProps;


export const ProtectedRouteElement = ({ children}: TChildren) => {
  let cookie = getCookie("authToken");  
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  console.log(cookie)
  console.log(isLogged)
  const location = useLocation();
  if (!isLogged && !cookie) {
    return <Navigate to="/login" state={ location } />;
  }
  return children;
};
