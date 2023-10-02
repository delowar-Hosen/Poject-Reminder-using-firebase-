import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import Search from "./Search";
import { useDispatch } from "react-redux";
import { user } from "../reduxToolkit/userlistSlice";
import TodayBillPaid from "./TodayBillPaid";
import { Link } from "react-router-dom";

const Rechargelist = () => {
  const [addRecharge, setAddRecharge] = useState(false);
  const [boxUsers, setBoxUsers] = useState([]);
  const [rechargeList, setRechargeList] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchErr, setSearchErr] = useState([]);
  const [isRunning, setIsRunning] = useState([]);

  const db = getDatabase();
  let dispatch = useDispatch();

  let handleRecharge = (item) => {
    let presentDate = new Date();

    let rechargeEndDate = new Date(
      presentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    let alertDate = new Date(presentDate.getTime() + 28 * 24 * 60 * 60 * 1000);

    let startLocalFormat = new Date().toLocaleDateString();
    let endLocalFormat = rechargeEndDate.toLocaleDateString();
    let alertLocalFormat = alertDate.toLocaleDateString();

    set(push(ref(db, "rechargeList/")), {
      clientName: item.clientName,
      fatherName: item.fatherName,
      phone: item.phone,
      clientNationId: item.clientNationId,
      boxId: item.boxId,
      areaname: item.areaname,
      bill: item.montlyBill,
      managername: item.managername,
      RechargeStartDate: startLocalFormat,
      RechargeEndDate: endLocalFormat,
      RechargeAlertDate: alertLocalFormat,
      id: item.id,
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "boxusers/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBoxUsers(arr);
      dispatch(user(arr));
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "rechargeList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      let rechargeArr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
        rechargeArr.push(item.val().id);
      });
      setRechargeList(arr);
      setIsRunning(rechargeArr);
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
        } else {
          setSearchErr("Not Match");
        }
      } else {
        arr = [];
      }
      setSearch(arr);
    });
  };

  return (
    <div className=" w-full m-auto pl-8 pr-4">
      {addRecharge ? (
        <div className="w-full relative mt-4 ">
          <h2 className="font-san text-center  font-bold text-2xl ">
            ADD RECHARGE LIST
          </h2>
          <div className="absolute top-8 lg:top-16 right-0">
            <Link to="/todaypaidlist">
              <button className="font-san py-3 px-3 mr-4   bg-black text-white rounded-md font-bold text-[10px] lg:text-base uppercase text-right">
                Today Bill Paid
              </button>
            </Link>
            <Link to="/todayrecharge">
              <button className="font-san py-3 px-3 mr-4   bg-black text-white rounded-md font-bold text-[10px] lg:text-base uppercase text-right">
                Today Recharge
              </button>
            </Link>

            <button
              onClick={() => setAddRecharge(!addRecharge)}
              className="font-san py-3 px-3  bg-black text-white rounded-md font-bold text-[10px] lg:text-base uppercase text-right"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full relative mt-4">
            <h2 className="font-san text-center  font-bold text-2xl ">
              RECHARGE LIST
            </h2>
            <button
              onClick={() => setAddRecharge(!addRecharge)}
              className="font-san py-3 px-3 absolute top-8 lg:top-0 right-0  bg-black text-white rounded-md font-semibold text-[10px] lg:text-base uppercase text-right"
            >
              Add Recharge List
            </button>
          </div>

          <div className="w-full mt-10">
            <ul className="flex w-full  font-san font-bold uppercase text-[10px] md:text-sm">
              <li className=" w-[12%] md:w-[5%] h-[50px] border flex justify-center items-center">
                Serial
              </li>
              <li className=" w-[38%] md:w-[30%] h-[50px] border flex justify-center items-center">
                Name
              </li>
              <li className=" w-[10%] md:w-[8%] text-center h-[50px] border flex justify-center items-center">
                stb id
              </li>
              <li className=" w-[16%] md:w-[11%] h-[50px] border flex justify-center items-center">
                area
              </li>
              <li className=" w-[12%] md:w-[6%] h-[50px] border flex justify-center items-center">
                Status
              </li>
              <li className="w-[10%] md:[10%] h-[50px] border hidden md:flex justify-center items-center">
                {" "}
                Issue Date
              </li>
              <li className="w-[14%] md:[16%] h-[50px] border hidden md:flex justify-center items-center">
                {" "}
                Last rch
              </li>
              <li className="w-[14%] md:w-[16%] text-center h-[50px] border flex justify-center items-center">
                end rch
              </li>
            </ul>
          </div>
          <div id="user" className="h-[200px] md:[350px]">
            {rechargeList.map((item, index) => (
              <ul
                key={index}
                className="flex w-full  font-san font-normal uppercase text-[10px] md:text-sm"
              >
                <li className=" w-[12%] md:w-[5%] h-[50px] border flex justify-center items-center">
                  {index + 1}
                </li>
                <li className=" w-[38%] md:w-[30%] h-[50px] border flex justify-center items-center">
                  {item.clientName}
                </li>
                <li className=" w-[10%] md:w-[8%] h-[50px] border flex justify-center items-center">
                  {item.boxId}
                </li>
                <li className=" w-[16%] md:w-[11%] h-[50px] border flex text-center justify-center items-center">
                  {item.areaname}
                </li>
                <li className=" w-[12%] md:w-[6%] h-[50px] border flex justify-center items-center">
                  Status{" "}
                </li>
                <li className="w-[10%] h-[50px] border hidden md:flex justify-center items-center">
                  {" "}
                  {item.issueDate}
                </li>
                <li className="w-[14%]  md:[16%] h-[50px] border hidden md:flex justify-center items-center">
                  {" "}
                  Last Recharge Date{" "}
                </li>
                <li className="w-[14%] md:w-[16%] h-[50px] border flex justify-center  items-center">
                  Recharge End Date
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}

      {addRecharge && (
        <div>
          <Search state={handleSearch} />
          <div className="w-full mt-2">
            <ul className="flex w-full  font-san font-bold uppercase text-[10px] md:text-sm">
              <li className=" w-[12%] md:w-[5%] h-[50px] border flex justify-center items-center">
                Serial
              </li>
              <li className=" w-[38%] md:w-[30%] h-[50px] border flex justify-center items-center">
                Name
              </li>
              <li className=" w-[10%] md:w-[8%] h-[50px] border flex justify-center items-center">
                stb id
              </li>
              <li className=" w-[16%] md:w-[11%] h-[50px] border flex justify-center items-center">
                area
              </li>
              <li className=" w-[12%] md:w-[6%] h-[50px] border flex justify-center items-center">
                Status
              </li>
              <li className="w-[10%] md:[10%] h-[50px] border hidden md:flex justify-center items-center">
                {" "}
                Issue Date
              </li>
              <li className="w-[14%] md:[16%] h-[50px] border hidden md:flex justify-center items-center">
                {" "}
                Phone Number{" "}
              </li>
              <li className="w-[14%] md:w-[16%] h-[50px] border bg-[#634747] text-white flex justify-center items-center">
                Action
              </li>
            </ul>
          </div>

          <div id="user" className="h-[200px] md:h-[350px]">
            {search.length > 0
              ? search.map((item, index) => (
                  <ul
                    key={index}
                    className="flex w-full  font-san font-normal uppercase text-[10px] md:text-sm"
                  >
                    <li className=" w-[12%] md:w-[5%] h-[50px] border flex justify-center items-center">
                      {index + 1}
                    </li>
                    <li className=" w-[38%] md:w-[30%] h-[50px] border flex justify-center items-center">
                      {item.clientName}
                    </li>
                    <li className=" w-[10%] md:w-[8%] h-[50px] border flex justify-center items-center">
                      {item.boxId}
                    </li>
                    <li className=" w-[16%] md:w-[11%] h-[50px] border flex justify-center items-center">
                      {item.areaname}
                    </li>
                    <li className=" w-[12%] md:w-[6%] h-[50px] border flex justify-center items-center">
                      Status
                    </li>
                    <li className="w-[10%] md:[10%] h-[50px] border hidden md:flex justify-center items-center">
                      {item.issueDate}
                    </li>
                    <li className="w-[14%] md:[16%] h-[50px] border hidden md:flex justify-center items-center">
                      {item.phone}
                    </li>

                    {isRunning.includes(item.id) ? (
                      <li className="w-[14%] md:w-[16%] h-[50px] border bg-[#634747] text-white flex justify-center items-center">
                        Running
                      </li>
                    ) : (
                      <li
                        onClick={() => handleRecharge(item)}
                        className="w-[14%] md:w-[16%] h-[50px] border bg-[#634747] text-white flex justify-center items-center"
                      >
                        Recharge
                      </li>
                    )}
                  </ul>
                ))
              : boxUsers.map((item, index) => (
                  <ul
                    key={index}
                    className="flex w-full  font-san font-normal uppercase text-[10px] md:text-sm"
                  >
                    <li className=" w-[12%] md:w-[5%] h-[50px] border flex justify-center items-center">
                      {index + 1}
                    </li>
                    <li className=" w-[38%] md:w-[30%] h-[50px] border flex justify-center items-center">
                      {item.clientName}
                    </li>
                    <li className=" w-[10%] md:w-[8%] h-[50px] border flex justify-center items-center">
                      {item.boxId}
                    </li>
                    <li className=" w-[16%] md:w-[11%] h-[50px] border flex justify-center items-center">
                      {item.areaname}
                    </li>
                    <li className=" w-[12%] md:w-[6%] h-[50px] border flex justify-center items-center">
                      Status
                    </li>
                    <li className="w-[10%] md:[10%] h-[50px] border hidden md:flex justify-center items-center">
                      {item.issueDate}
                    </li>
                    <li className="w-[14%] md:[16%] h-[50px] border hidden md:flex justify-center items-center">
                      {item.phone}
                    </li>

                    {isRunning.includes(item.id) ? (
                      <li className="w-[14%] md:w-[16%] h-[50px] border bg-[#634747] text-white flex justify-center items-center">
                        Running
                      </li>
                    ) : (
                      <li
                        onClick={() => handleRecharge(item)}
                        className="w-[14%] md:w-[16%] h-[50px] border bg-[#634747] text-white flex justify-center items-center"
                      >
                        Recharge
                      </li>
                    )}
                  </ul>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rechargelist;
