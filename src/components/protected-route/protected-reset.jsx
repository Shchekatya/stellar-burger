import { Navigate, useLocation } from "react-router-dom";

export const ProtectedReset = ({ children }) => {
  const location = useLocation();
  if (location.state)

  if (!location.state) {
    return <Navigate to="/" />;
  }
  return children;
};
