import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Rechargelist from "../../Components/Rechargelist";
import Rechargereminder from "../../Components/Rechargereminder";
import Sidebar from "../../Components/Sidebar";
import Settings from "../../Components/Settings";
import DocumentReader from "../../Components/DocumentReader";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Setting = () => {
  let user = useSelector((item) => item.auth.value);

  return (
    <div>
      {user && (
        <div>
          <Helmet>
            <title>Reminder</title>
          </Helmet>
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
