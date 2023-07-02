import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import RechargePaidHistory from "../../Components/RechargePaidHistory";
import Sidebar from "../../Components/Sidebar";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Message = () => {
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
              <Sidebar active="todo" />
            </div>
            <div className="w-[90%]">
              <RechargePaidHistory />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
