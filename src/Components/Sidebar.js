import React from "react";
import { ImUsers, ImBoxAdd } from "react-icons/im";
import { RiTodoLine } from "react-icons/ri";
import { AiFillAlert, AiFillSetting, AiFillFileAdd } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ active }) => {
  return (
    <div className=" w-full lg:w-40 px-2 lg:px-0  bg-[#1e2833] flex lg:flex-col  lg:gap-y-12 items-center gap-x-4 lg:gap-x-0 justify-between lg:justify-center py-10">
      <div
        className={`${
          active == "home" &&
          "relative mx-4 lg:mx-0  cursor-pointer after:absolute after:py-[25px] lg:after:py-[28px] after:px-[28px] lg:after:px-[57px] after:bg-white  after:rounded-lg lg:after:rounded-none lg:after:rounded-0 lg:after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/">
          <ImUsers
            className={`${
              active == "home"
                ? "text-black text-base lg:text-4xl mt-0.5"
                : "text-white text-base lg:text-4xl"
            }`}
          />
        </Link>

        {active == "home" && (
          <div className=" w-24 absolute top-[-5px] right-[-60px] lg:border-t border-black lg:border-b ">
            <p className="font-san ml-0 lg:ml-8  font-bold  mt-2 lg:mt-0 mr-8 lg:mr-1 text-[8px] lg:text-[10px] text-center text-black    uppercase py-4 ">
              Box Users
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "boxadd" &&
          "relative mx-4 lg:mx-0  cursor-pointer  after:absolute after:py-[25px] lg:after:py-[28px] after:px-[28px] lg:after:px-[57px] after:bg-white  after:rounded-lg lg:after:rounded-none lg:after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/boxadd">
          <ImBoxAdd
            className={`${
              active == "boxadd"
                ? "text-black text-base lg:text-4xl mt-0.5"
                : "text-white text-base lg:text-4xl"
            }`}
          />
        </Link>

        {active == "boxadd" && (
          <div className=" w-24 absolute top-[-5px] right-[-60px] lg:border-t border-black lg:border-b  ">
            <p className="font-san ml-0 lg:ml-8 font-bold  mt-2 lg:mt-0 mr-8 lg:mr-1 text-[8px] lg:text-[10px] text-center text-black    uppercase py-4 ">
              Box Add
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "alert" &&
          "relative mx-4 lg:mx-0   cursor-pointer  after:absolute after:py-[25px] lg:after:py-[28px] after:px-[28px] lg:after:px-[57px] after:bg-white  after:rounded-lg lg:after:rounded-none lg:after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/alert">
          <AiFillAlert
            className={`${
              active == "alert"
                ? "text-black text-base lg:text-4xl mt-0.5"
                : "text-white text-base lg:text-4xl"
            }`}
          />
        </Link>

        {active == "alert" && (
          <div className=" w-24 absolute top-[-5px] right-[-60px] lg:border-t border-black lg:border-b  ">
            <p className="font-san ml-0 lg:ml-8 font-bold  mt-2 lg:mt-0 mr-8 lg:mr-1 text-[8px] lg:text-[10px] text-center text-black    uppercase py-4">
              Alert RCh
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "todo" &&
          "relative mx-4 lg:mx-0  cursor-pointer  after:absolute after:py-[25px] lg:after:py-[28px] after:px-[28px] lg:after:px-[57px] after:bg-white  after:rounded-lg lg:after:rounded-none lg:after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/message">
          <RiTodoLine
            className={`${
              active == "todo"
                ? "text-black text-base lg:text-4xl mt-0.5"
                : "text-white text-base lg:text-4xl"
            }`}
          />
        </Link>

        {active == "todo" && (
          <div className="  w-24 absolute top-[-5px] right-[-60px] lg:border-t border-black lg:border-b ">
            <p className="font-san ml-0 lg:ml-8 font-bold  mt-2 lg:mt-0 mr-8 lg:mr-1 text-[8px] lg:text-[10px] text-center text-black    uppercase py-4 ">
              TO Do
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "rechargelist" &&
          "relative mx-4 lg:mx-0   cursor-pointer after:absolute after:py-[25px] lg:after:py-[28px] after:px-[28px] lg:after:px-[57px] after:bg-white  after:rounded-lg lg:after:rounded-none lg:after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/rechargelist">
          <AiFillFileAdd
            className={`${
              active == "rechargelist"
                ? "text-black text-base lg:text-4xl mt-0.5"
                : "text-white text-base lg:text-4xl"
            }`}
          />
        </Link>

        {active == "rechargelist" && (
          <div className=" w-24 absolute top-[-5px] right-[-60px] lg:border-t border-black lg:border-b">
            <p className="font-san font-bold ml-0 lg:ml-8 mt-2 lg:mt-0 mr-8 lg:mr-1 text-[8px] lg:text-[10px] text-center text-black    uppercase py-4 ">
              Add RCH
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "settings" &&
          "relative mx-4 lg:mx-0  cursor-pointer  after:absolute after:py-[25px] lg:after:py-[28px] after:px-[28px] lg:after:px-[57px] after:bg-white after:rounded-lg lg:after:rounded-none   lg:after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/settings">
          <AiFillSetting
            className={`${
              active == "settings"
                ? "text-black text-base lg:text-4xl mt-0.5"
                : "text-white text-base lg:text-4xl"
            }`}
          />
        </Link>

        {active == "settings" && (
          <div className="  w-24 absolute top-[-5px] right-[-60px] lg:border-t border-black lg:border-b">
            <p className="font-san font-bold ml-0 lg:ml-8 mt-2 lg:mt-0 mr-8 lg:mr-1 text-[8px] lg:text-[10px] text-center text-black    uppercase py-4 ">
              Settings
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
