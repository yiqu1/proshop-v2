import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// protects certain routes — only allowing logged-in users
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // <Outlet /> means “render whatever child route is inside this route”
  // If not logged in → you’re redirected to /login -> child route
  // <Navigate> is a React Router component (from react-router-dom) that performs a redirect. It works like calling navigate("/login") — but it’s used inside JSX.
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
