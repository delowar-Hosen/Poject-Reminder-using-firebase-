import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Loginuser = () => {
  const user = useSelector((item) => item.auth.value);
  return user ? <Outlet />  :<Navigate to="/login" /> ;
};

export default Loginuser;
