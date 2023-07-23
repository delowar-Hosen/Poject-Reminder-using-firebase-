import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { BsFillBackspaceReverseFill } from "react-icons/bs";
import "../../src/index.css";

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
    <div className=" p-2 lg:p-0 w-full lg:w-[98%] m-auto relative">
      <div className="w-full">
        <div className="w-full m-auto text-center mt-2">
          <h2 className="font-san font-bold text-2xl uppercase">User List</h2>
        </div>

        <Search state={handleSearch} />
        <div className="w-full">
          <div className="w-full">
            <ul className="flex w-full  font-san font-bold uppercase text-[10px] md:text-sm">
              <li className=" w-[12%] md:w-[5%] h-[50px] border flex justify-center items-center">
                SL
              </li>
              <li className=" w-[38%] md:w-[30%] h-[50px] border flex justify-center items-center">
                Name
              </li>
              <li className=" w-[10%] md:w-[8%] h-[50px] border flex justify-center items-center">
                stb id
              </li>
              <li className=" w-[18%] md:w-[15%] h-[50px] border flex justify-center items-center">
                area
              </li>
              <li className=" w-[12%] md:w-[8%] h-[50px] border flex justify-center items-center">
                Status
              </li>
              <li className="w-[10%] h-[50px] border hidden md:flex justify-center items-center">
                {" "}
                Issue
              </li>
              <li className="w-[14%] h-[50px] border hidden md:flex justify-center items-center">
                {" "}
                Last RCH
              </li>
              <li className="w-[12%] md:w-[10%] h-[50px] border flex justify-center items-center">
                action
              </li>
            </ul>
          </div>

          <div id="user" className="h-[200px] md:h-[350px]">
            {search.length > 0
              ? search.map((item, index) => (
                  <ul className="flex w-full  font-san font-normal uppercase text-[10px] md:text-sm">
                    <li className=" w-[12%] md:w-[5%] h-[50px] border flex justify-center items-center">
                      {index + 1}
                    </li>
                    <li className=" w-[38%] md:w-[30%] h-[50px] border flex justify-center items-center">
                      {item.clientName}
                    </li>
                    <li className=" w-[10%] md:w-[8%] h-[50px] border flex justify-center items-center">
                      {item.boxId}
                    </li>
                    <li className=" w-[18%] md:w-[15%] h-[50px] border flex text-center justify-center items-center">
                      {item.areaname}
                    </li>
                    <li className=" w-[12%] md:w-[8%] h-[50px] border flex justify-center items-center">
                      Status{" "}
                    </li>
                    <li className="w-[10%] h-[50px] border hidden  lg:flex justify-center items-center">
                      {" "}
                      {item.issueDate}
                    </li>
                    <li className="w-[14%] h-[50px] border hidden lg:flex justify-center items-center">
                      {" "}
                      Last Recharge Date{" "}
                    </li>
                    <li
                      onClick={() => handleDetails(item)}
                      className=" cursor-pointer w-[12%] md:w-[10%] h-[50px] border flex justify-center bg-[#634747] text-white items-center"
                    >
                      Details
                    </li>
                  </ul>
                ))
              : boxUsers.map((item, index) => (
                  <ul className="flex w-full  font-san font-normal uppercase text-[10px] md:text-sm">
                    <li className=" w-[12%] md:w-[5%] h-[50px] border flex justify-center items-center">
                      {index + 1}
                    </li>
                    <li className=" w-[38%] md:w-[30%] h-[50px] border flex justify-center items-center">
                      {item.clientName}
                    </li>
                    <li className=" w-[10%] md:w-[8%] h-[50px] border flex justify-center items-center">
                      {item.boxId}
                    </li>
                    <li className=" w-[18%] md:w-[15%] h-[50px] border flex text-center justify-center items-center">
                      {item.areaname}
                    </li>
                    <li className=" w-[12%] md:w-[8%] h-[50px] border flex justify-center items-center">
                      Status{" "}
                    </li>
                    <li className="w-[10%] h-[50px] border hidden md:flex justify-center items-center">
                      {" "}
                      {item.issueDate}
                    </li>
                    <li className="w-[14%] h-[50px] border hidden md:flex justify-center items-center">
                      {" "}
                      Last Recharge Date{" "}
                    </li>
                    <li
                      onClick={() => handleDetails(item)}
                      className=" cursor-pointer w-[12%] md:w-[10%] h-[50px] border flex justify-center bg-[#634747] text-white items-center"
                    >
                      Details
                    </li>
                  </ul>
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
                  <h2 className="font-san font-semibold text-4xl mt-10 uppercase underline">
                    Details
                  </h2>
                </div>

                <div className="flex  p-5 mt-10">
                  {details.map((item, index) => (
                    <div className="flex ">
                      <div
                        key={index}
                        className="flex flex-col items-center justify-between pr-[70px]"
                      >
                        <img className=" w-24 h-24 bg-red-500" />
                        <h3 className="font-san font-semibold text-base mt-3 text-black uppercase">
                          {item.clientName}
                        </h3>
                      </div>

                      <div className="pr-[70px]">
                        <p className="font-san font-semibold text-base mr-4  ">
                          ID Number:
                          <span className="font-san font-normal ml-2 text-base">
                            {item.clientNationId}
                          </span>
                        </p>
                        <p className="font-san font-semibold text-base mr-4 ">
                          Father / Husband Name:
                          <span className="font-san font-normal ml-2 text-base">
                            {item.fatherName}
                          </span>
                        </p>
                        <p className="font-san font-semibold text-base mr-4 ">
                          Mobile Number:
                          <span className="font-san font-normal ml-2 text-base">
                            {item.phone}
                          </span>
                        </p>
                        <p className="font-san font-semibold text-base mr-4">
                          Ariea Name:
                          <span className="font-san font-normal ml-2 text-base">
                            {item.areaname}
                          </span>
                        </p>
                      </div>
                      <div className="pl-10 pr-10">
                        <p className="font-san font-semibold text-base mr-4 ">
                          Ariea Manager:
                          <span className="font-san font-normal ml-2 text-base">
                            {item.managername}
                          </span>
                        </p>
                        <p className="font-san font-semibold text-base mr-4 ">
                          Issue Date:
                          <span className="font-san font-normal ml-2 text-base">
                            {item.issueDate}
                          </span>
                        </p>
                        <p className="font-san font-semibold text-base mr-4 ">
                          Box Id:
                          <span className="font-san font-normal ml-2 text-base">
                            {item.boxId}
                          </span>
                        </p>
                        <p className="font-san font-semibold text-base mr-4 ">
                          Box Price:
                          <span className="font-san font-normal ml-2 text-base">
                            {item.boxPrice}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}

                  <div>
                    <h3 className="font-san font-semibold text-2xl mb-5 mt-[-10px] text-center">
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
      </div>
    </div>
  );
};

export default Userlist;
