import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Rechargelist from "../../Components/Rechargelist";
import Rechargereminder from "../../Components/Rechargereminder";
import Sidebar from "../../Components/Sidebar";
import Settings from "../../Components/Settings";

const Setting = () => {
  const [varify, setVarify] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    } else {
      if (!auth.currentUser.emailVerified) {
        setVarify(false);
      } else {
        setVarify(true);
      }
    }
  }, []);

  return (
    <div>
      {varify && (
        <div>
          <div className="w-full">
            <Navbar />
          </div>
          <div className="flex">
            <div className="w-[10%]">
              <Sidebar active="settings" />
            </div>
            <div className="w-[90%]">
              <Settings />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
