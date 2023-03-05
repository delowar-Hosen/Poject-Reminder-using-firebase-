import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import RechargePaidHistory from "../../Components/RechargePaidHistory";
import Sidebar from "../../Components/Sidebar";

const Message = () => {
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
              <Sidebar active="todo" />
            </div>
            <div className="w-[90%]">
              <RechargePaidHistory />
            </div>
          </div>
          {/* <Details /> */}
          {/* <Addbox /> */}
          {/* <Rechargereminder /> */}
          {/* <Rechargelist /> */}
        </div>
      )}
    </div>
  );
};

export default Message;
