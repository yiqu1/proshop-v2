import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // protects certain routes — only allowing logged-in users and admin
  // <Outlet /> means “render whatever child route is inside this route”
  // If not logged in → you’re redirected to /login -> child route
  // <Navigate> is a React Router component that performs a redirect. It works like calling navigate("/login") — but it’s used inside JSX.
  // replace -> user can't go back to the previous page after logging in
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
