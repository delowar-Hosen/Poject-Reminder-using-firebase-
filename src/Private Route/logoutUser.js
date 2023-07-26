import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const Logoutuser = () => {
  const user = useSelector((item) => item.auth.value);
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default Logoutuser;
