import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  return (
    !user ? <Navigate to="/login" /> : <Outlet />
  )
};
export default PrivateRoute;