import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import Search from "./Search";
import { useDispatch } from "react-redux";
import { user } from "../reduxToolkit/userlistSlice";

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

    let startLocalFormat = new Date().toLocaleDateString();
    let endLocalFormat = rechargeEndDate.toLocaleDateString();

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
    <div className=" w-[90%] m-auto">
      {addRecharge ? (
        <div className="w-full relative mt-4 ">
          <h2 className="font-san text-center  font-bold text-2xl ">
            ADD RECHARGE LIST
          </h2>
          <button
            onClick={() => setAddRecharge(!addRecharge)}
            className="font-san py-3 px-3 absolute top-0 right-0  bg-black text-white rounded-md font-bold text-base uppercase text-right"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="w-full relative mt-4">
            <h2 className="font-san text-center  font-bold text-2xl ">
              RECHARGE LIST
            </h2>
            <button
              onClick={() => setAddRecharge(!addRecharge)}
              className="font-san py-3 px-3 absolute top-0 right-0  bg-black text-white rounded-md font-semibold text-base uppercase text-right"
            >
              Add Recharge List
            </button>
          </div>
          <div className="flex mt-12 w-[98.6%]">
            <p className="font-san font-semibold text-base  border border-solid flex justify-center items-center  w-[70px] py-3">
              Serial{" "}
            </p>
            <p className="font-san font-semibold text-base  border border-solid py-3 flex justify-center items-center  w-[300px]">
              Member Name{" "}
            </p>
            <p className="font-san font-semibold text-base flex justify-center items-center border border-solid py-3  w-[175px]">
              STB ID Number{" "}
            </p>
            <p className="font-san font-semibold text-base flex items-center justify-center border border-solid py-3  w-[150px]">
              Area Name{" "}
            </p>
            <p className="font-san font-semibold text-base flex justify-center items-center border border-solid py-3  w-[130px]">
              Issue Date{" "}
            </p>
            <p className="font-san font-semibold text-base flex justify-center items-center border border-solid py-3  w-[110px]">
              Status{" "}
            </p>
            <p className="font-san font-semibold text-base flex justify-center items-center border border-solid py-3  w-[200px]">
              Recharge Start Date
            </p>
            <button className="font-san font-semibold text-base flex justify-center items-center border border-solid py-3  w-[200px]">
              Recharge End Date
            </button>
          </div>
          <div className=" h-[60vh] overflow-y-scroll">
            {rechargeList.map((item, index) => (
              <div key={index} className="flex">
                <p className="font-san font-normal text-sm border border-solid flex justify-center items-center  w-[70px] py-3">
                  {index + 1}
                </p>
                <p className="font-san font-normal text-sm  border border-solid py-3 flex justify-center items-center  w-[300px]">
                  {item.clientName}
                </p>
                <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[175px]">
                  {item.fatherName}
                </p>
                <p className="font-san font-normal text-sm flex items-center justify-center border border-solid py-3  w-[150px]">
                  {item.areaname}
                </p>
                <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[130px]">
                  Issue Date{" "}
                </p>
                <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[110px]">
                  Status{" "}
                </p>
                <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[200px]">
                  {item.RechargeStartDate}
                </p>
                <button className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[200px]">
                  {item.RechargeEndDate}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {addRecharge && (
        <div>
          <Search state={handleSearch} />

          <div className="mt-2 flex w-[98.6%] ">
            <p className="font-san font-bold text-lg  border border-solid flex justify-center items-center  w-[70px] py-3">
              Serial{" "}
            </p>
            <p className="font-san font-bold text-lg  border border-solid py-3 flex justify-center items-center  w-[300px]">
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
            <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[180px]">
              Phone Number{" "}
            </p>
            <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[100px]">
              Action
            </p>
          </div>
          <div className="w-full h-[53vh] overflow-y-scroll">
            {search.length > 0
              ? search.map((item, index) => (
                  <div key={index} className=" flex">
                    <p className="font-san font-normal text-sm  border border-solid flex justify-center items-center  w-[70px] py-3">
                      {index + 1}
                    </p>
                    <p className="font-san font-normal text-sm  border border-solid py-3 flex justify-center items-center  w-[300px]">
                      {item.clientName}
                    </p>
                    <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[175px]">
                      {item.boxId}
                    </p>
                    <p className="font-san font-normal text-sm flex items-center justify-center border border-solid py-3  w-[150px]">
                      {item.areaname}
                    </p>
                    <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[130px]">
                      {item.issueDate}
                    </p>
                    <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[110px]">
                      Status{" "}
                    </p>
                    <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[180px]">
                      {item.phone}
                    </p>

                    {isRunning.includes(item.id) ? (
                      <button className="font-san font-normal text-sm flex justify-center bg-[#634747]  items-center border border-solid py-3  w-[100px]">
                        Running
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRecharge(item)}
                        className="font-san font-normal text-sm flex justify-center bg-[#634747]  items-center border border-solid py-3  w-[100px]"
                      >
                        Recharge
                      </button>
                    )}
                  </div>
                ))
              : boxUsers.map((item, index) => (
                  <div key={index} className=" flex">
                    <p className="font-san font-normal text-sm  border border-solid flex justify-center items-center  w-[70px] py-3">
                      {index + 1}
                    </p>
                    <p className="font-san font-normal text-sm  border border-solid py-3 flex justify-center items-center  w-[300px]">
                      {item.clientName}
                    </p>
                    <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[175px]">
                      {item.boxId}
                    </p>
                    <p className="font-san font-normal text-sm flex items-center justify-center border border-solid py-3  w-[150px]">
                      {item.areaname}
                    </p>
                    <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[130px]">
                      {item.issueDate}
                    </p>
                    <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[110px]">
                      Status{" "}
                    </p>
                    <p className="font-san font-normal text-sm flex justify-center items-center border border-solid py-3  w-[180px]">
                      {item.phone}
                    </p>

                    {isRunning.includes(item.id) ? (
                      <button className="font-san font-normal text-sm flex bg-[#634747] text-white  justify-center items-center border border-solid py-3  w-[100px]">
                        Running
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRecharge(item)}
                        className="font-san font-normal text-sm flex bg-[#634747] text-white justify-center items-center border border-solid py-3  w-[100px]"
                      >
                        Recharge
                      </button>
                    )}
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rechargelist;
