import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import "../../src/index.css";
const Rechargereminder = () => {
  const [alertRechargeList, setAlertRechargeList] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "rechargeList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        const { RechargeStartDate, RechargeEndDate, RechargeAlertDate } =
          item.val();
        const uploadDate = new Date(RechargeStartDate);
        const endDate = new Date(RechargeEndDate);
        const alert = new Date(RechargeAlertDate);
        const currentDate = new Date();
        const timeDiff = currentDate - uploadDate;
        const daysPassed = timeDiff / (1000 * 60 * 60 * 24);
        const isOneMonthComplete = daysPassed >= 28;
        let alertDate = new Date(
          uploadDate.getTime() + 28 * 24 * 60 * 60 * 1000
        );

        // console.log("current", currentDate);
        // console.log("shesh", endDate);
        // console.log("days", daysPassed);
        // console.log("alert", alertDate);
        // console.log("noti", isOneMonthComplete);
        // console.log("end", cake);
        // console.log(alertDate >= uploadDate && alertDate <= RechargeEndDate);

        // if (alertDate == currentDate || alertDate <= currentDate) {
        //   console.log(item.val());
        // }

        // if (alertDate == RechargeEndDate) {
        // }

        if (daysPassed >= 28) {
          console.log(item.val());
        }

        if (alertDate == alert || alert >= alertDate) {
          arr.push(item.val());
        }
      });
      setAlertRechargeList(arr);
    });
  }, []);

  return (
    <div className=" lg:w-[90%] m-auto mt-10">
      <div className=" text-center">
        <h2 className="font-san font-bold text-2xl ">Recharge Reminder</h2>
      </div>
      <div className="flex mt-2">
        <div className="w-full">
          <ul className="flex w-full  font-san font-bold uppercase text-[10px] md:text-sm">
            <li className=" w-[12%] lg:w-[5%] h-[50px] border flex justify-center items-center">
              SL
            </li>
            <li className=" w-[36%] lg:w-[30%] h-[50px] border flex justify-center items-center">
              Name
            </li>
            <li className=" w-[10%] lg:w-[8%] h-[50px] border flex justify-center items-center">
              stb id
            </li>
            <li className=" w-[18%] lg:w-[15%] h-[50px] border flex justify-center items-center">
              area
            </li>
            <li className=" w-[12%] lg:w-[8%] h-[50px] border flex justify-center items-center">
              Status
            </li>
            <li className="w-[10%] h-[50px] lg:w-[12%] border hidden lg:flex justify-center items-center">
              {" "}
              Issue
            </li>
            <li className="w-[14%] h-[50px]  lg:w-[12%] border hidden lg:flex justify-center items-center">
              {" "}
              Last RCH
            </li>
            <li className="w-[12%] lg:w-[10%] h-[50px] border flex justify-center items-center">
              action
            </li>
          </ul>
        </div>
      </div>

      {alertRechargeList.length <= 0 ? (
        <div className="w-full text-center bg-green-500 p-3 ">
          <h2 className="font-san font-normal text-Base text-white ">
            Today No Box Are To For Reminding Recharge
          </h2>
        </div>
      ) : (
        alertRechargeList.map((item, index) => (
          <div id="user" className="h-[200px] lg:h-[350px]">
            <ul className="  flex w-full  font-san font-normal uppercase text-[10px] md:text-sm">
              <li className=" w-[12%] md:w-[5%] h-[50px] border flex justify-center items-center">
                {index + 1}
              </li>
              <li className=" w-[38%] md:w-[30%] h-[50px] border flex justify-center items-center">
                {item.clientName}
              </li>
              <li className=" w-[10%] md:w-[8%] h-[50px] border flex justify-center items-center">
                {item.boxId}
              </li>
              <li className=" w-[18%] md:w-[17%] h-[50px] border flex justify-center items-center">
                {item.areaname}
              </li>
              <li className=" w-[12%] md:w-[6%] h-[50px] border flex justify-center items-center">
                Status
              </li>
              <li className="w-[10%] h-[50px] border hidden md:flex justify-center items-center">
                {" "}
                Issue Date
              </li>
              <li className="w-[14%] h-[50px] border hidden md:flex justify-center items-center">
                {" "}
                {item.RechargeEndDate}
              </li>
              <li className="w-[12%] md:w-[10%] h-[50px] border flex justify-center items-center">
                Send Message
              </li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Rechargereminder;
