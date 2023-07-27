import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Rechargelist from "../../Components/Rechargelist";
import Rechargereminder from "../../Components/Rechargereminder";
import Sidebar from "../../Components/Sidebar";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const RCHList = () => {
  let user = useSelector((item) => item.auth.value);

  return (
    <div>
      {user && (
        <div className=" relative">
          <Helmet>
            <title>Reminder</title>
          </Helmet>
          <div className="w-full">
            <Navbar />
          </div>
          <div className="lg:flex">
            <div className=" fixed bottom-0 z-50  left-0 lg:static  w-full lg:w-[15%]">
              <Sidebar active="rechargelist" />
            </div>

            <div className="lg:w-[90%]">
              <Rechargelist />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RCHList;
