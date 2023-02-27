import React from "react";
import { ImUsers, ImBoxAdd, ImBoxRemove } from "react-icons/im";
import {
  AiFillAlert,
  AiFillSetting,
  AiFillMessage,
  AiFillFileAdd,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ active }) => {
  const navigate = useNavigate();

  return (
    <div className=" w-40 bg-[#634747] flex flex-col  gap-y-16 items-center justify-center py-10">
      <div
        className={`${
          active == "home" &&
          "relative  after:absolute after:py-8 after:px-[60px] after:bg-white after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/">
          <ImUsers
            className={`${
              active == "home" ? "text-black text-5xl" : "text-white text-5xl"
            }`}
          />
        </Link>

        {active == "home" && (
          <div className=" w-24 absolute top-[-1px] right-[-56px] border-t border-black border-b ">
            <p className="font-san font-bold mr-1 text-[10px] text-right text-black    uppercase py-4 ">
              Box Users
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "boxadd" &&
          "relative  after:absolute after:py-8 after:px-[60px] after:bg-white after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/boxadd">
          <ImBoxAdd
            className={`${
              active == "boxadd" ? "text-black text-5xl" : "text-white text-5xl"
            }`}
          />
        </Link>

        {active == "boxadd" && (
          <div className=" w-24 absolute top-[-1px] right-[-56px] border-t border-black border-b ">
            <p className="font-san font-bold mr-1 text-[10px] text-right text-black    uppercase py-4 ">
              Box Add
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "alert" &&
          "relative  after:absolute after:py-8 after:px-[60px] after:bg-white after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/alert">
          <AiFillAlert
            className={`${
              active == "alert" ? "text-black text-5xl" : "text-white text-5xl"
            }`}
          />
        </Link>

        {active == "alert" && (
          <div className=" w-24 absolute top-[-1px] right-[-56px] border-t border-black border-b ">
            <p className="font-san font-bold mr-1 text-[10px] text-right text-black    uppercase py-4 ">
              Alert RCh
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "message" &&
          "relative  after:absolute after:py-8 after:px-[60px] after:bg-white after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/message">
          <AiFillMessage
            className={`${
              active == "message"
                ? "text-black text-5xl"
                : "text-white text-5xl"
            }`}
          />
        </Link>

        {active == "message" && (
          <div className=" w-24 absolute top-[-1px] right-[-56px] border-t border-black border-b ">
            <p className="font-san font-bold mr-1 text-[10px] text-right text-black    uppercase py-4 ">
              Message
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "rechargelist" &&
          "relative  after:absolute after:py-8 after:px-[60px] after:bg-white after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/rechargelist">
          <AiFillFileAdd
            className={`${
              active == "rechargelist"
                ? "text-black text-5xl"
                : "text-white text-5xl"
            }`}
          />
        </Link>

        {active == "rechargelist" && (
          <div className=" w-24 absolute top-[-1px] right-[-56px] border-t border-black border-b ">
            <p className="font-san font-bold mr-1 text-[10px] text-right text-black    uppercase py-4 ">
              Add RCH
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          active == "settings" &&
          "relative  after:absolute after:py-8 after:px-[60px] after:bg-white after:rounded-l-[5px] rounded-r  after:top-[-9px] after:left-[-16px] z-50 after:z-[-1]"
        }`}
      >
        <Link to="/settings">
          <AiFillSetting
            className={`${
              active == "settings"
                ? "text-black text-5xl"
                : "text-white text-5xl"
            }`}
          />
        </Link>

        {active == "settings" && (
          <div className=" w-24 absolute top-[-1px] right-[-56px] border-t border-black border-b ">
            <p className="font-san font-bold mr-1 text-[10px] text-right text-black    uppercase py-4 ">
              Settings
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
