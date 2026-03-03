import { Navigate, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "../lib/blogStorage";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const authed = isAdminAuthenticated();

  if (!authed) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }

  return children;
}
