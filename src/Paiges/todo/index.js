import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import RechargePaidHistory from "../../Components/RechargePaidHistory";
import Sidebar from "../../Components/Sidebar";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Todo = () => {
  let user = useSelector((item) => item.auth.value);

  return (
    <div>
      {user && (
        <div className="relative">
          <Helmet>
            <title>Reminder</title>
          </Helmet>
          <div className="w-full">
            <Navbar />
          </div>
          <div className="lg:flex">
            <div className=" absolute bottom-[-364px]  left-0 lg:static  w-full lg:w-[15%]">
              <Sidebar active="todo" />
            </div>
            <div className="lg:w-[90%]">
              <RechargePaidHistory />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
