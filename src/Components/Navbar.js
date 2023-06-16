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

  let handleAreaManager = (e) => {
    setAreaManager(e.target.value);
  };

  let handleAreaName = (e) => {
    setAreaName(e.target.value);
  };

  let handleArea = () => {
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
  };

  let handleSubArea = () => {
    if (!areaName) {
      setSubErr("Please Select A Area Name");
    } else if (!areaManager) {
      setSubErr("Please Select A Manager Name");
    } else {
      setSuccess("Successfully Added");
      set(push(ref(db, "areas/")), {
        areaName: areaName,
        areaManager: areaManager,
        userId: auth.currentUser.uid,
      });
    }
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
    <div className="border-b-2  border-solid">
      <Container>
        <div
          className="flex items-center justify-between py-6 
        "
        >
          {user.map((item) => (
            <div className="flex items-center">
              <div className="relative group">
                <img className=" w-14 h-14 rounded-full" src={item.avatar} />
                <div className="absolute top-0 left-0">
                  <div className="hidden group-hover:block ease-linear">
                    <div className="   w-14 h-14 rounded-full text-white bg-[#00000069] flex justify-center items-center">
                      <AiOutlineCloudUpload />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" ml-3">
                <h2 className="font-san font-bold  text-lg text-black">
                  {item.name}
                </h2>
                <p className="font-san font-normal  text-sm text-black">
                  Area Manager
                </p>
              </div>
            </div>
          ))}

          <div>
            <ul className="font-san  font-bold cursor-pointer items-center text-base text-black flex  gap-x-6">
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
          <div
            onClick={handleLogOut}
            className="flex  items-center cursor-pointer"
          >
            <p className="font-san font-semibold text-base text-black mr-3">
              LogOut
            </p>
            <div className="border border-black  rounded-full w-10 h-10 flex items-center justify-center">
              <AiOutlineLogout className="text-lg text-red-600" />
            </div>
          </div>
        </div>
      </Container>
      {paidPage && (
        <div className="w-full h-screen bg-[#00000031] fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="w-[500px] flex flex-col items-center p-6 bg-white rounded-lg">
            <h3 className="font-san font bold text-2xl uppercase">
              Add Your SubArea
            </h3>
            <div className=" mt-8">
              {/* {paidErr && (
                <p className="w-full py-2 flex items center justify-center font-san font-semibold text-white bg-red-500 mt-4 mb-4 rounded-lg">
                  {paidErr}
                </p>
              )}
              {paidsuccess && (
                <p className="w-full py-2 flex items center font-san font-semibold text-white justify-center bg-green-500 mt-4 mb-4 rounded-lg">
                  {paidsuccess}
                </p>
              )} */}
              <div className="flex items-center w-full">
                <span className="font-san font-semibold text-lg  w-[250px] mr-[5px]">
                  {" "}
                  Area Name:
                </span>
                <select
                  id="countries"
                  onChange={handleAreaName}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose A Area</option>
                  <option value="Bisra Kandi">Bisra Kandi</option>
                  <option value="Uttar Kulaura">Uttor Kulaura</option>
                  <option value="Hid Road">Hid Road</option>
                </select>
              </div>

              <div className="flex items-center w-full mt-4">
                <span className="font-san font-semibold text-lg  w-[250px] mr-[5px]">
                  {" "}
                  Area Manager:
                </span>
                <select
                  id="countries"
                  onChange={handleAreaManager}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose A Name</option>
                  <option value="Delowar Hosen">Delowar Hosen</option>
                  <option value="Kawsar">Kawsar Ahmed</option>
                </select>
              </div>
              <div className="flex  justify-end mt-8">
                <div className="w-[200px] flex justify-between">
                  <button
                    onClick={() => setPaidPage(false)}
                    className="font-san  font-semibold text-lg py-2 px-3 rounded-lg bg-[#e42424] text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubArea}
                    className="font-san font-semibold text-lg py-2 px-3 rounded-lg bg-slate-900 text-white"
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
