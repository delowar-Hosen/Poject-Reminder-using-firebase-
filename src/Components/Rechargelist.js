import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const Rechargelist = () => {
  const [addRecharge, setAddRecharge] = useState(false);

  return (
    <div className=" p-5 mt-10">
      {addRecharge ? (
        <div className="w-full relative ">
          <h2 className="font-san text-center  font-bold text-5xl ">
            Add Recharge List
          </h2>
          <button
            onClick={() => setAddRecharge(!addRecharge)}
            className="font-san py-3 px-3 absolute top-0 right-[165px]  bg-black text-white rounded-md font-bold text-lg uppercase text-right"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="w-full relative ">
          <h2 className="font-san text-center  font-bold text-5xl ">
            Recharge List
          </h2>
          <button
            onClick={() => setAddRecharge(!addRecharge)}
            className="font-san py-3 px-3 absolute top-0 right-[165px]  bg-black text-white rounded-md font-bold text-lg uppercase text-right"
          >
            Add Recharge List
          </button>
        </div>
      )}

      {addRecharge && (
        <div>
          <div className="relative w-[400px] mt-10">
            <input
              className="font-san relative font-normal text-base py-3 px-5 w-[400px] border border-solid   placeholder:font-san placeholder:font-normal placeholder:text-sm"
              placeholder="Please search with ID ,Name and Number"
            />
            <BsSearch className=" absolute  top-5 right-5" />
          </div>

          <div className="mt-2 flex">
            <p className="font-san font-medium text-lg  border border-solid flex justify-center items-center  w-[80px] py-3">
              Serial{" "}
            </p>
            <p className="font-san font-medium text-lg  border border-solid py-3 flex justify-center items-center  w-[400px]">
              User Name{" "}
            </p>
            <p className="font-san font-medium text-lg flex justify-center items-center border border-solid py-3  w-[175px]">
              STB ID Number{" "}
            </p>
            <p className="font-san font-medium text-lg flex items-center justify-center border border-solid py-3  w-[150px]">
              Area Name{" "}
            </p>
            <p className="font-san font-medium text-lg flex justify-center items-center border border-solid py-3  w-[130px]">
              Issue Date{" "}
            </p>
            <p className="font-san font-medium text-lg flex justify-center items-center border border-solid py-3  w-[110px]">
              Status{" "}
            </p>
            <button className="font-san font-semibold ml-[200px] text-base  flex justify-center items-center border border-solid py-3 bg-black text-white  w-[200px]">
              Add Recharge List
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 flex">
        <p className="font-san font-bold text-lg  border border-solid flex justify-center items-center  w-[80px] py-3">
          Serial{" "}
        </p>
        <p className="font-san font-bold text-lg  border border-solid py-3 flex justify-center items-center  w-[400px]">
          User Name{" "}
        </p>
        <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[175px]">
          STB ID Number{" "}
        </p>
        <p className="font-san font-bold text-lg flex items-center justify-center border border-solid py-3  w-[150px]">
          Area Name{" "}
        </p>
        <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[130px]">
          Issue Date{" "}
        </p>
        <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[110px]">
          Status{" "}
        </p>
        <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[200px]">
          Recharge Start Date
        </p>
        <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[200px]">
          Recharge End Date
        </p>
      </div>
      <div className="flex">
        <p className="font-san font-normal text-base  border border-solid flex justify-center items-center  w-[80px] py-3">
          Serial{" "}
        </p>
        <p className="font-san font-normal text-base  border border-solid py-3 flex justify-center items-center  w-[400px]">
          User Name{" "}
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[175px]">
          STB ID Number{" "}
        </p>
        <p className="font-san font-normal text-base flex items-center justify-center border border-solid py-3  w-[150px]">
          Area Name{" "}
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[130px]">
          Issue Date{" "}
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[110px]">
          Status{" "}
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[200px]">
          31 December 2022
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[200px]">
          31 January 2023
        </p>
      </div>
      <div className="flex">
        <p className="font-san font-normal text-base  border border-solid flex justify-center items-center  w-[80px] py-3">
          Serial{" "}
        </p>
        <p className="font-san font-normal text-base  border border-solid py-3 flex justify-center items-center  w-[400px]">
          User Name{" "}
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[175px]">
          STB ID Number{" "}
        </p>
        <p className="font-san font-normal text-base flex items-center justify-center border border-solid py-3  w-[150px]">
          Area Name{" "}
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[130px]">
          Issue Date{" "}
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[110px]">
          Status{" "}
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[200px]">
          31 December 2022
        </p>
        <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[200px]">
          31 January 2023
        </p>
      </div>
    </div>
  );
};

export default Rechargelist;
