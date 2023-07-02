import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Loginuser = () => {
  const user = useSelector((item) => item.auth.value);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default Loginuser;
