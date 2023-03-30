import { Navigate, useLocation } from "react-router-dom";
import { TChildren } from "./protected-route";

export const ProtectedReset = ({ children }:TChildren ) => {
  const location = useLocation();
  if (location.state)

  if (!location.state) {
    return <Navigate to="/" />;
  }
  return children;
};
