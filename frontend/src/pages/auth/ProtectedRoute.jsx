import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  return tokens ? children : <Navigate to="/login" />;
}
