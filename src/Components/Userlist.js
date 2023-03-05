import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Search from "./Search";

const Userlist = () => {
  const [boxUsers, setBoxUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchErr, setSearchErr] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "boxusers/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setBoxUsers(arr);
    });
  }, []);

  let arr = [];

  let handleSearch = (e) => {
    boxUsers.filter((item) => {
      if (e.target.value != "") {
        if (
          item.clientName.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        } else if (
          item.boxId.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        } else if (item.phone.includes(e.target.value)) {
          arr.push(item);
        }
      } else {
        arr = [];
      }
      setSearch(arr);
    });
  };
  return (
    <div className=" p-5 mt-10">
      <div className="w-full text-center">
        <h2 className="font-san font-bold text-5xl uppercase">User List</h2>
      </div>

      <Search state={handleSearch} />
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
          Last Recharge Date{" "}
        </p>
        <button className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[200px]">
          INFORMATION
        </button>
      </div>
      {search.length > 0
        ? search.map((item, index) => (
            <div className="flex">
              <p className="font-san font-normal text-base  border border-solid flex justify-center items-center  w-[80px] py-3">
                {index + 1}
              </p>
              <p className="font-san font-normal text-base  border border-solid py-3 flex justify-center items-center  w-[400px]">
                {item.clientName}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[175px]">
                {item.boxId}
              </p>
              <p className="font-san font-normal text-base flex items-center justify-center border border-solid py-3  w-[150px]">
                {item.areaname}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[130px]">
                {item.issueDate}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[110px]">
                Status{" "}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[200px]">
                Last Recharge Date{" "}
              </p>
              <button className="font-san font-normal text-base  flex justify-center items-center border border-solid py-3 bg-black text-white  w-[200px]">
                DETAILS
              </button>
            </div>
          ))
        : boxUsers.map((item, index) => (
            <div className="flex">
              <p className="font-san font-normal text-base  border border-solid flex justify-center items-center  w-[80px] py-3">
                {index + 1}
              </p>
              <p className="font-san font-normal text-base  border border-solid py-3 flex justify-center items-center  w-[400px]">
                {item.clientName}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[175px]">
                {item.boxId}
              </p>
              <p className="font-san font-normal text-base flex items-center justify-center border border-solid py-3  w-[150px]">
                {item.areaname}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[130px]">
                {item.issueDate}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[110px]">
                Status{" "}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[200px]">
                Last Recharge Date{" "}
              </p>
              <button className="font-san font-normal text-base  flex justify-center items-center border border-solid py-3 bg-black text-white  w-[200px]">
                DETAILS
              </button>
            </div>
          ))}
    </div>
  );
};

export default Userlist;
