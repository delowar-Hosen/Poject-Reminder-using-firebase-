import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Addbox from "../../Components/Addbox";
import Details from "../../Components/Details";
import Navbar from "../../Components/Navbar";
import Rechargelist from "../../Components/Rechargelist";
import Rechargereminder from "../../Components/Rechargereminder";
import Settings from "../../Components/Settings";
import Sidebar from "../../Components/Sidebar";
import Userlist from "../../Components/Userlist";
import { getDatabase, ref, onValue } from "firebase/database";
import PdfDownloadButton from "../../Components/DocumentReader";
import DocumentReader from "../../Components/DocumentReader";

const Home = () => {
  const [varify, setVarify] = useState(false);
  const [boxUsers, setBoxUsers] = useState([]);

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
    <>
      {varify && (
        <div>
          <div className="w-full">
            <Navbar />
          </div>
          <div className="flex">
            <div className="w-[15%]">
              <Sidebar active="home" />
            </div>
            <div className="w-[85%]">
              <Userlist />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
