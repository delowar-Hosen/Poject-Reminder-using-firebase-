import React from "react";
import Container from "./Container";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="border-b-2  border-solid">
      <Container>
        <div
          className="flex items-center justify-between py-6 
        "
        >
          <div className="flex items-center">
            <img className=" w-14 h-14 rounded-full bg-red-500" />
            <div className=" ml-3">
              <h2 className="font-san font-bold  text-lg text-black">
                Md Delowar Hossain
              </h2>
              <p className="font-san font-normal  text-sm text-black">
                Area Manager
              </p>
            </div>
          </div>
          <div>
            <ul className="font-san uppercase font-normal text-base text-black flex  gap-x-6">
              <li>BisraKandi</li>
              <li>BisraKandi</li>
              <li>BisraKandi</li>
              <li>BisraKandi</li>
              <li>BisraKandi</li>
            </ul>
          </div>
          <div className="flex  items-center cursor-pointer">
            <p className="font-san font-semibold text-base text-black mr-3">
              LogOut
            </p>
            <div className="border border-black  rounded-full w-10 h-10 flex items-center justify-center">
              <AiOutlineLogout className="text-lg text-red-600" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
