import React, { useEffect, useState } from "react";
import Container from "./Container";
import {
  AiOutlineLogout,
  AiOutlinePlus,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { authData } from "../reduxToolkit/authUserSlice";

const Navbar = () => {
  const [paidPage, setPaidPage] = useState(false);
  const [areaManager, setAreaManager] = useState("");
  const [areaName, setAreaName] = useState("");
  const [subErr, setSubErr] = useState("");
  const [success, setSuccess] = useState("");
  const [areas, setAreas] = useState([]);
  const [user, setuser] = useState([]);

  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();
  let dispatch = useDispatch();

  let handleAreaName = (e) => {
    setAreaName(e.target.value);
  };

  let handleArea = () => {
    setSubErr("");
    setSuccess("");
    setPaidPage(true);
  };

  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.removeItem("auth");
    dispatch(authData(null));
  };

  let handleSubArea = () => {
    if (!areaName) {
      setSubErr("Please Select A Area Name");
    } else {
      setSuccess("Successfully Added");
      set(push(ref(db, "areas/")), {
        areaName: areaName,
        areaManager: areaManager,
        userId: auth.currentUser.uid,
      });
    }
    setTimeout(() => {
      setPaidPage(false);
    }, 3000);
  };

  useEffect(() => {
    const starCountRef = ref(db, "areas/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setAreas(arr);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().id) {
          arr.push(item.val());
        }
      });
      setuser(arr);
    });
  }, []);
  return (
    <div className=" border-b-2 p-2 lg:p-0    bg-[#868e96]  border-solid">
      <Container>
        <div
          className="relative lg:flex items-center justify-between py-6  
        "
        >
          {user.map((item) => (
            <div className=" border-b lg:border-0 pb-2 lg:pb-0 flex items-center">
              <div className="relative group cursor-pointer">
                <img
                  className=" w-12 h-12 lg:w-14 lg:h-14 rounded-full"
                  src={item.avatar}
                />
                <div className="absolute top-0 left-0">
                  <div className="hidden group-hover:block ease-linear">
                    <div className=" w-12 h-12  lg:w-14 lg:h-14 rounded-full text-white bg-[#00000069] flex justify-center items-center">
                      <AiOutlineCloudUpload />
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-1 lg:ml-3">
                <h2 className="font-san font-bold  text-sm lg:text-lg   text-white">
                  {item.name}
                </h2>
                <p className="font-san font-normal  text-xs lg:text-sm   text-white">
                  Area Manager
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-center items-center pt-2 lg:pt-0">
            <ul className="font-san font-normal lg:font-bold cursor-pointer  text-[12px] lg:text-base  text-white  capitalize  flex flex-wrap gap-x-2 justify-center items-center  lg:gap-x-6">
              {areas.length < 0 ? (
                <li onClick={handleArea} className=" flex items-center">
                  Add Your SubArea
                  <AiOutlinePlus className="ml-2 border border-solid text-2xl p-1" />
                </li>
              ) : (
                areas.map((item, index) => (
                  <li key={index}> {item.areaName}</li>
                ))
              )}
              {areas.length < 5 ? (
                <li onClick={handleArea} className=" flex items-center">
                  <AiOutlinePlus className="ml-2 border border-solid text-2xl p-1" />
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div className=" absolute top-5 right-0 lg:static">
            <div
              onClick={handleLogOut}
              className="flex  items-center cursor-pointer"
            >
              <p className="font-san font-semibold text-base  text-white mr-3">
                LogOut
              </p>
              <div className="border border-white  rounded-full w-10 h-10 flex items-center justify-center">
                <AiOutlineLogout className="text-lg text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      {paidPage && (
        <div className="w-full h-screen bg-[#00000031] fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="w-[300px] lg:w-[500px] flex flex-col items-center p-6 bg-white rounded-lg">
            <h3 className="font-san font bold text-sm lg:text-2xl uppercase border-b lg:border-0 pb-2 lg:pb-0">
              Add Your SubArea
            </h3>
            <div className=" mt-8">
              {subErr && (
                <p className="w-full py-2 flex items center justify-center font-san font-semibold text-white bg-red-500 mt-4 mb-4 rounded-lg">
                  {subErr}
                </p>
              )}
              {success && (
                <p className="w-full py-2 flex items center font-san font-semibold text-white justify-center bg-green-500 mt-4 mb-4 rounded-lg">
                  {success}
                </p>
              )}
              <div className="flex items-center  lg:w-[400px] m-auto">
                <span className="font-san font-semibold text-base lg:text-lg  w-[250px]  lg:mr-[4px]">
                  {" "}
                  Area Name:
                </span>
                <input
                  id="countries"
                  placeholder="Enter Your Subarea"
                  onChange={handleAreaName}
                  className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="flex  justify-end mt-4">
                <div className="w-[200px] flex justify-end lg:justify-between">
                  <button
                    onClick={() => setPaidPage(false)}
                    className="font-san  font-semibold mr-4 lg:mr-0 text-base py-2 px-3 rounded-lg bg-[#e42424] text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubArea}
                    className="font-san font-semibold text-base py-2 px-3 rounded-lg bg-slate-900 text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
