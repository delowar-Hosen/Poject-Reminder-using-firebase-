import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { BsFillBackspaceReverseFill } from "react-icons/bs";

const Userlist = () => {
  const [boxUsers, setBoxUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchErr, setSearchErr] = useState([]);
  const [details, setDetails] = useState([]);
  const [detailsPage, setDetailsPage] = useState(false);
  const [rechargeHistory, setRechargeHistory] = useState([]);

  const db = getDatabase();
  const navigate = useNavigate();

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

  let handleDetails = (item) => {
    const starCountRef = ref(db, "boxusers/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item2) => {
        if (item.boxId == item2.val().boxId) {
          arr.push(item2.val());
        }
      });
      setDetails(arr);
      setDetailsPage(true);
    }).then(() => {
      const rechargeRef = ref(db, "rechargeList/");
      onValue(rechargeRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item2) => {
          if (item.boxId == item2.val().boxId) {
            arr.push(item2.val());
          }
        });
        setRechargeHistory(arr);
      });
    });
  };
  return (
    <div className=" p-5 mt-2 relative">
      <div className="w-full text-center">
        <h2 className="font-san font-bold text-5xl uppercase">
          User List
        </h2>
      </div>

      <Search state={handleSearch} />

      <div className="flex">
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
      <div className="w-full h-[53vh] overflow-y-scroll">
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
                <button
                  onClick={() => handleDetails(item)}
                  className="font-san font-normal text-base  flex justify-center items-center border border-solid py-3 bg-black text-white  w-[200px]"
                >
                  DETAILS
                </button>
              </div>
            ))}
      </div>
      {detailsPage && (
        <div className="w-[96%] border border-solid rounded-lg  h-[80vh] flex items-center justify-center m-auto ml-5 absolute top-0 left-0 bg-[#0003] ">
          <div className="bg-white w-full pb-10 border border-solid rounded-lg">
            <div className="w-full flex justify-end">
              <BsFillBackspaceReverseFill
                className="text-4xl m-5"
                onClick={() => setDetailsPage(false)}
              />
            </div>

            <div className="w-full text-center">
              <h2 className="font-san font-bold text-4xl mt-10 uppercase underline">
                Details
              </h2>
            </div>

            <div className="flex  p-5 mt-10">
              {details.map((item) => (
                <div className="flex ">
                  <div className="flex flex-col items-center justify-between pr-[70px]">
                    <img className=" w-24 h-24 bg-red-500" />
                    <h3 className="font-san font-bold text-lg mt-3 text-black uppercase">
                      {item.clientName}
                    </h3>
                  </div>

                  <div className="pr-[70px]">
                    <p className="font-san font-bold text-lg mr-4  ">
                      ID Number:
                      <span className="font-san font-normal ml-2 text-base">
                        {item.clientNationId}
                      </span>
                    </p>
                    <p className="font-san font-bold text-lg mr-4 ">
                      Father / Husband Name:
                      <span className="font-san font-normal ml-2 text-base">
                        {item.fatherName}
                      </span>
                    </p>
                    <p className="font-san font-bold text-lg mr-4 ">
                      Mobile Number:
                      <span className="font-san font-normal ml-2 text-base">
                        {item.phone}
                      </span>
                    </p>
                    <p className="font-san font-bold text-lg mr-4">
                      Ariea Name:
                      <span className="font-san font-normal ml-2 text-base">
                        {item.areaname}
                      </span>
                    </p>
                  </div>
                  <div className="pl-10 pr-10">
                    <p className="font-san font-bold text-lg mr-4 ">
                      Ariea Manager:
                      <span className="font-san font-normal ml-2 text-base">
                        {item.managername}
                      </span>
                    </p>
                    <p className="font-san font-bold text-lg mr-4 ">
                      Issue Date:
                      <span className="font-san font-normal ml-2 text-base">
                        {item.issueDate}
                      </span>
                    </p>
                    <p className="font-san font-bold text-lg mr-4 ">
                      Box Id:
                      <span className="font-san font-normal ml-2 text-base">
                        {item.boxId}
                      </span>
                    </p>
                    <p className="font-san font-bold text-lg mr-4 ">
                      Box Price:
                      <span className="font-san font-normal ml-2 text-base">
                        {item.boxPrice}
                      </span>
                    </p>
                  </div>
                </div>
              ))}

              <div>
                <h3 className="font-san font-bold text-2xl mb-5 mt-[-10px] text-center">
                  Recharge History
                </h3>
                {rechargeHistory.map((item) => (
                  <div className="flex justify-between">
                    <div className="mr-5">
                      <p className="font-san font-normal text-base">
                        Serial :{" "}
                        <span className="font-san font-light text-sm">
                          Date
                        </span>
                      </p>
                      <p className="font-san font-normal text-base">
                        Serial :{" "}
                        <span className="font-san font-light text-sm">
                          Date
                        </span>
                      </p>
                      <p className="font-san font-normal text-base">
                        Serial :{" "}
                        <span className="font-san font-light text-sm">
                          Date
                        </span>
                      </p>
                      <p className="font-san font-normal text-base">
                        Serial :{" "}
                        <span className="font-san font-light text-sm">
                          Date
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userlist;
