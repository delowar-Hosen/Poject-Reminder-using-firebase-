import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Addbox from "../../Components/Addbox";
import Sidebar from "../../Components/Sidebar";
import { Helmet } from "react-helmet";

const Boxadd = () => {
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
            <Helmet>
            <title>Reminder</title>
          </Helmet>
          <div className="w-full">
            <Navbar />
          </div>
          <div className="flex">
            <div className="w-[10%]">
              <Sidebar active="boxadd" />
            </div>
            <div className="w-[90%]">
              <Addbox />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boxadd;
