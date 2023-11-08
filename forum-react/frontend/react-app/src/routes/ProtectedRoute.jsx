import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.user);

  if (!userToken) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
};
