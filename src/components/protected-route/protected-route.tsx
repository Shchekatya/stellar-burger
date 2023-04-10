import React from "react";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, useLocation,RouteProps } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/hooks";
import rootReducer from "../../services/reducers/root-reducer";
import { getCookie } from "../../utils/cookie";


export type TChildren = {
  children: JSX.Element
}& RouteProps;


export const ProtectedRouteElement = ({ children}: TChildren) => {
  let cookie = getCookie("refreshToken"); 
  const isLogged = useAppSelector((state) => state.login.isLoggedIn);
  const location = useLocation();
  if (!isLogged && !cookie) {
    return <Navigate to="/login" state={ location } />;
  }
  return children;
};
