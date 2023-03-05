import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import Search from "./Search";

const RechargePaidHistory = () => {
  const [addRecharge, setAddRecharge] = useState(false);
  const [boxUsers, setBoxUsers] = useState([]);
  const [rechargeList, setRechargeList] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchErr, setSearchErr] = useState([]);
  const [paidPage, setPaidPage] = useState(false);

  const db = getDatabase();

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
        arr.push(item.val());
      });
      setRechargeList(arr);
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

  let handlePaid = () => {
    setPaidPage(true);
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
          {rechargeList.map((item, index) => (
            <div className="flex">
              <p className="font-san font-normal text-base  border border-solid flex justify-center items-center  w-[80px] py-3">
                {index + 1}
              </p>
              <p className="font-san font-normal text-base  border border-solid py-3 flex justify-center items-center  w-[400px]">
                {item.clientName}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[175px]">
                {item.fatherName}
              </p>
              <p className="font-san font-normal text-base flex items-center justify-center border border-solid py-3  w-[150px]">
                {item.areaname}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[130px]">
                Paid Date{" "}
              </p>
              <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[110px]">
                Paid Taka{" "}
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
                  <button className="font-san font-semibold ml-[10px] text-base  flex justify-center items-center border border-solid py-3 bg-black text-white  w-[200px]">
                    Recharge
                  </button>
                </div>
              ))
            : boxUsers.map((item, index) => (
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
                    onClick={handlePaid}
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
          <div>
            <h3>Paid Your Bill</h3>
            <div>
              <input placeholder="hello paid" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechargePaidHistory;
