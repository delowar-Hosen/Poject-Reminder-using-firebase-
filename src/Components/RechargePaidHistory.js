import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { paid } from "../reduxToolkit/paidSlice";

const RechargePaidHistory = () => {
  const [addRecharge, setAddRecharge] = useState(false);
  const [boxUsers, setBoxUsers] = useState([]);
  const [rechargeList, setRechargeList] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchErr, setSearchErr] = useState([]);
  const [paidPage, setPaidPage] = useState(false);
  const [paidBy, setPaidBy] = useState("");
  const [paidTaka, setPaidTaka] = useState("");
  const [paidErr, setPaidErr] = useState("");
  const [paidsuccess, setPaidSuccess] = useState("");
  const [paidList, setPaidList] = useState("");
  const [paidHistory, setPaidHistory] = useState([]);

  const db = getDatabase();
  let dispatch = useDispatch();
  const paidData = useSelector((state) => state.paid.value);

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
    });
  };

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

  useEffect(() => {
    const starCountRef = ref(db, "rechargeList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), key: item.key });
      });
      setRechargeList(arr);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "paidList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setPaidHistory(arr);
    });
  }, []);
  let arr = [];

  let handleSearch = (e) => {
    rechargeList.filter((item) => {
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

  let handlePaid = (item) => {
    setPaidPage(true);
    dispatch(paid(item));
  };

  let handlePaidBy = (e) => {
    setPaidBy(e.target.value);
    setPaidErr("");
  };

  let handlePaidTaka = (e) => {
    setPaidTaka(e.target.value);
    setPaidErr("");
  };

  let handleRechargePaid = (paidData) => {
    setPaidErr("");
    setPaidSuccess("");
    if (!paidBy) {
      setPaidErr("Please Select A Name");
    } else if (!paidTaka) {
      setPaidErr("Please Give A Amount");
    } else {
      let startLocalFormat = new Date().toLocaleDateString();
      set(push(ref(db, "paidList/")), {
        clientName: paidData.clientName,
        fatherName: paidData.fatherName,
        phone: paidData.phone,
        clientNationId: paidData.clientNationId,
        boxId: paidData.boxId,
        areaname: paidData.areaname,
        paidBy: paidBy,
        paidBill: paidTaka,
        managername: paidData.managername,
        RechargeStartDate: paidData.RechargeStartDate,
        RechargeEndDate: paidData.RechargeEndDate,
        paidDate: startLocalFormat,
        id: paidData.id,
      }).then(() => {
        setPaidSuccess("Your Recharge Name Added Recharge Paid History List");

        setTimeout(() => {
          remove(ref(db, "rechargeList/" + paidData.key));
          setPaidSuccess("");
          setPaidErr("");
          setPaidBy("");
          setPaidTaka("");
          setPaidPage(false);
        }, 2000);
      });
    }
  };

  return (
    <div className=" p-5 mt-10">
      {addRecharge ? (
        <div className="w-full relative ">
          <h2 className="font-san text-center  font-bold text-5xl ">
            ADD PAID LIST
          </h2>
          <button
            onClick={() => setAddRecharge(!addRecharge)}
            className="font-san py-3 px-3 absolute top-0 right-[165px]  bg-black text-white rounded-md font-bold text-lg uppercase text-right"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="w-full relative ">
            <h2 className="font-san text-center  font-bold text-5xl ">
              RECHARGE PAID HISTORY
            </h2>
            <button
              onClick={() => setAddRecharge(!addRecharge)}
              className="font-san py-3 px-3 absolute top-0 right-[165px]  bg-black text-white rounded-md font-bold text-lg uppercase text-right"
            >
              Go To Recharge List
            </button>
          </div>
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
              Paid By{" "}
            </p>
            <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[130px]">
              Paid Date{" "}
            </p>
            <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[110px]">
              Paid Taka{" "}
            </p>
            <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[200px]">
              Recharge Start Date
            </p>
            <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[200px]">
              Recharge End Date
            </p>
          </div>
          {paidHistory.map((item, index) => (
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
                {item.paidBy}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[130px]">
                {item.paidDate}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[110px]">
                {item.paidBill}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[200px]">
                {item.RechargeStartDate}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[200px]">
                {item.RechargeEndDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {addRecharge && (
        <div>
          <Search state={handleSearch} />

          <div className="mt-2 flex">
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
            <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[210px]">
              Recharge Start Date
            </p>
            <p className="font-san font-bold text-lg flex justify-center items-center border border-solid py-3  w-[210px]">
              Recharge End Date
            </p>
            <button className="font-san font-semibold ml-[10px] text-base  flex justify-center items-center border border-solid py-3 bg-black text-white  w-[200px]">
              Add Paid List
            </button>
          </div>
          {search.length > 0
            ? search.map((item, index) => (
                <div className=" flex">
                  <p className="font-san font-normal text-lg  border border-solid flex justify-center items-center  w-[80px] py-3">
                    {index + 1}
                  </p>
                  <p className="font-san font-normal text-lg  border border-solid py-3 flex justify-center items-center  w-[400px]">
                    {item.clientName}
                  </p>
                  <p className="font-san font-normal text-lg flex justify-center items-center border border-solid py-3  w-[175px]">
                    {item.boxId}
                  </p>
                  <p className="font-san font-normal text-lg flex items-center justify-center border border-solid py-3  w-[150px]">
                    {item.areaname}
                  </p>
                  <p className="font-san font-normal text-lg flex justify-center items-center border border-solid py-3  w-[210px]">
                    {item.issueDate}
                  </p>

                  <p className="font-san font-normal text-lg flex justify-center items-center border border-solid py-3  w-[210px]">
                    {item.phone}
                  </p>
                  <button
                    onClick={() => handlePaid(item)}
                    className="font-san font-semibold ml-[10px] text-base  flex justify-center items-center border border-solid py-3 bg-black text-white  w-[200px]"
                  >
                    Paid
                  </button>
                </div>
              ))
            : rechargeList.map((item, index) => (
                <div className=" flex">
                  <p className="font-san font-normal text-lg  border border-solid flex justify-center items-center  w-[80px] py-3">
                    {index + 1}
                  </p>
                  <p className="font-san font-normal text-lg  border border-solid py-3 flex justify-center items-center  w-[400px]">
                    {item.clientName}
                  </p>
                  <p className="font-san font-normal text-lg flex justify-center items-center border border-solid py-3  w-[175px]">
                    {item.boxId}
                  </p>
                  <p className="font-san font-normal text-lg flex items-center justify-center border border-solid py-3  w-[150px]">
                    {item.areaname}
                  </p>
                  <p className="font-san font-normal text-lg flex justify-center items-center border border-solid py-3  w-[210px]">
                    {item.issueDate}
                  </p>

                  <p className="font-san font-normal text-lg flex justify-center items-center border border-solid py-3  w-[210px]">
                    {item.phone}
                  </p>
                  <button
                    onClick={() => handlePaid(item)}
                    className="font-san font-semibold ml-[10px] text-base  flex justify-center items-center border border-solid py-3 bg-black text-white  w-[200px]"
                  >
                    Paid
                  </button>
                </div>
              ))}
        </div>
      )}
      {paidPage && (
        <div className="w-full h-screen bg-[#00000031] fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="w-[400px] flex flex-col items-center p-6 bg-white rounded-lg">
            <h3 className="font-san font bold text-2xl uppercase">
              Paid Your Bill
            </h3>
            <div className=" mt-8">
              {paidErr && (
                <p className="w-full py-2 flex items center justify-center font-san font-semibold text-white bg-red-500 mt-4 mb-4 rounded-lg">
                  {paidErr}
                </p>
              )}
              {paidsuccess && (
                <p className="w-full py-2 flex items center font-san font-semibold text-white justify-center bg-green-500 mt-4 mb-4 rounded-lg">
                  {paidsuccess}
                </p>
              )}
              <div className="flex items-center">
                <span className="font-san font-semibold text-lg w-[150px] mr-[5px]">
                  {" "}
                  Paid By:
                </span>
                <select
                  id="countries"
                  onChange={handlePaidBy}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose A Name</option>
                  <option value="Badol Kundo">Badol Kundo</option>
                  <option value="Rohit Melari">Rohit Melari</option>
                </select>
              </div>
              <div className="flex items-center mt-3">
                <span className="font-san font-semibold text-lg w-[150px] ">
                  {" "}
                  Paid Taka:
                </span>
                <input
                  onChange={handlePaidTaka}
                  className="py-2 px-2 border border-solid rounded-lg"
                  placeholder="Enter Amount"
                />
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
                    onClick={() => handleRechargePaid(paidData)}
                    className="font-san font-semibold text-lg py-2 px-3 rounded-lg bg-slate-900 text-white"
                  >
                    Paid
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

export default RechargePaidHistory;
