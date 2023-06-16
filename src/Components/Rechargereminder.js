import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";

const Rechargereminder = () => {
  const [alertRechargeList, setAlertRechargeList] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "rechargeList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        const { RechargeStartDate, RechargeEndDate } = item.val();
        let startDate = new Date(RechargeStartDate);
        let endDate = new Date(RechargeEndDate);
        let alertDate = new Date(
          startDate.getTime() + 29 * 24 * 60 * 60 * 1000
        );
        if (alertDate >= startDate && alertDate <= endDate) {
          let difference = alertDate.getTime() - new Date().getTime();
          setTimeout(() => {
            arr.push(item.val());
          }, difference);
        }
      });
      setAlertRechargeList(arr);
    });
  }, []);

  return (
    <div className=" w-[90%] m-auto mt-10">
      <div className=" text-center">
        <h2 className="font-san font-bold text-2xl ">Recharge Reminder</h2>
      </div>
      <div className="flex mt-2">
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
          Recharge End Date{" "}
        </p>
        <button className="font-san font-semibold text-base flex justify-center items-center border border-solid py-3  w-[200px]">
          Recharge
        </button>
      </div>

      {alertRechargeList.length <= 0 ? (
        <div className="w-full text-center bg-green-500 p-3 ">
          <h2 className="font-san font-normal text-Base text-white ">
            Today No Box Are To For Reminding Recharge
          </h2>
        </div>
      ) : (
        alertRechargeList.map((item, index) => (
          <div className="flex">
            <p className="font-san font-normal text-base  border border-solid flex justify-center items-center  w-[70px] py-3">
              {index + 1}
            </p>
            <p className="font-san font-normal text-base  border border-solid py-3 flex justify-center items-center  w-[300px]">
              {item.clientName}
            </p>
            <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[175px]">
              {item.boxId}
            </p>
            <p className="font-san font-normal text-base flex items-center justify-center border border-solid py-3  w-[150px]">
              {item.areaname}
            </p>
            <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[130px]">
              Issue Date{" "}
            </p>
            <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[110px]">
              Status{" "}
            </p>
            <p className="font-san font-normal text-base flex justify-center items-center border border-solid py-3  w-[200px]">
              {item.RechargeEndDate}
            </p>
            <button className="font-san font-normal text-base  flex justify-center items-center border border-solid py-3 bg-black text-white  w-[200px]">
              Send Message
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Rechargereminder;
