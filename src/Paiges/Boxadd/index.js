import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Addbox from "../../Components/Addbox";
import Sidebar from "../../Components/Sidebar";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Boxadd = () => {
  const [varify, setVarify] = useState(false);

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
