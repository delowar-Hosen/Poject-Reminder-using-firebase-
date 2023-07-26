import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Addbox from "../../Components/Addbox";
import Details from "../../Components/Details";
import Navbar from "../../Components/Navbar";

import Sidebar from "../../Components/Sidebar";
import Userlist from "../../Components/Userlist";

import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Home = () => {
  let auth = getAuth();
  const [varify, setVarify] = useState(false);
  const navigate = useNavigate();

  let user = useSelector((item) => item.auth.value);

  // useEffect(() => {
  //   if (!auth.currentUser) {
  //     navigate("/login");
  //   } else {
  //     if (!auth.currentUser.emailVerified) {
  //       setVarify(false);
  //     } else {
  //       setVarify(true);
  //     }
  //   }
  // }, []);

  return (
    <>
      {user && (
        <div className="relative">
          <Helmet>
            <title>Reminder</title>
          </Helmet>
          <div className="w-full">
            <Navbar />
          </div>
          <div className="lg:flex">
            <div className=" absolute bottom-[-122px]  left-0 lg:static  w-full lg:w-[15%]">
              <Sidebar active="home" />
            </div>
            <div className=" w-full lg:w-[85%]">
              <Userlist />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
