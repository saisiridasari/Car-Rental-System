
// Create a simple protected route component.
// Check if a token exists in localStorage.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

// If not, redirect the user to the login page.
// Otherwise, render the protected content.import { Navigate } from "react-router-dom";

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;