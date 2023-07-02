import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Rechargereminder from "../../Components/Rechargereminder";
import Sidebar from "../../Components/Sidebar";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Alert = () => {
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
              <Sidebar active="alert" />
            </div>
            <div className="w-[90%]">
              <Rechargereminder />
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

export default Alert;
