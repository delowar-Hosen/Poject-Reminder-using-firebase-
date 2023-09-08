import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getDatabase, ref, onValue, set, push } from "firebase/database";

const PdfDownloadButton = ({ click }) => {
  const [userList, setUserList] = useState([]);
  const [rechargeList, setRechargeList] = useState([]);
  const [paidList, setPaidList] = useState([]);
  const [todayPaidBill, setTodayPaidBill] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "boxusers/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setUserList(arr);
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

  useEffect(() => {
    const starCountRef = ref(db, "paidList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setPaidList(arr);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "everdayBillPaid/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().date == new Date().toLocaleDateString()) {
          arr.push(item.val());
        }
      });
      setTodayPaidBill(arr);
    });
  }, []);

  const handlePdf = (pdf) => {
    const doc = new jsPDF();
    if (pdf == "user") {
      const tableData = userList.map((item, index) => [
        index + 1,
        item.clientName,
        item.fatherName,
        item.areaname,
        item.phone,
        item.issueDate,
        item.boxId,
        item.boxPrice,
      ]);

      doc.autoTable({
        head: [
          [
            "Serial",
            "Name",
            "Father Name",
            "Area",
            "Phone",
            "Issue Date",
            "ID",
            "Price",
          ],
        ],
        body: tableData,
        options: {
          pageSize: "A4",
        },
      });
      doc.save(`Box User List Untill ${new Date().toLocaleDateString()}`);
    } else if (pdf == "recharge") {
      const tableData = rechargeList.map((item, index) => [
        index + 1,
        item.clientName,
        item.boxId,
        item.areaname,
        item.RechargeStartDate,
        item.RechargeEndDate,
      ]);

      doc.autoTable({
        head: [["Serial", "Name", "ID", "Area", "Start Date", "End Date"]],
        body: tableData,
        options: {
          pageSize: "A4",
        },
      });
      doc.save(`Recharge List ${new Date().toLocaleDateString()}`);
    } else if (pdf == "paid") {
      const tableData = paidList.map((item, index) => [
        index + 1,
        item.clientName,
        item.boxId,
        item.areaname,
        item.paidBy,
        item.paidDate,
        item.paidBill,
        item.RechargeStartDate,
        item.RechargeEndDate,
      ]);

      doc.autoTable({
        head: [
          [
            "Serial",
            "Name",
            "ID",
            "Area",
            "Paid By",
            "Paid Date",
            "Paid Bill",
            "Start",
            "End",
          ],
        ],
        body: tableData,
        options: {
          pageSize: "A4",
        },
      });
      doc.save(`Paid List ${new Date().toLocaleDateString()}`);
    } else if (pdf == "todaypaidbill") {
      const tableData = todayPaidBill.map((item, index) => [
        index + 1,
        item.name,
        item.area,
        item.date,
        item.paidBy,
        item.taka,
      ]);

      doc.autoTable({
        head: [["Serial", "Name", "Area", "Date", "Paid By", "Taka"]],
        body: tableData,
        options: {
          pageSize: "A4",
        },
      });
      doc.save(`${new Date().toLocaleDateString()} Bill Paid List`);
    }
  };

  return (
    <div className="w-[80%] text-center  text-white m-auto mt-8">
      <h4 className="font-san  text-black font-semibold text-xl mb-4">
        Store Your Document
      </h4>
      <div className="flex mt-8 gap-x-2">
        <button
          onClick={() => handlePdf("user")}
          className="font-san font-normal text-sm flex justify-center rounded-lg bg-[#634747]  items-center border border-solid py-3  w-[100px]"
        >
          User List
        </button>
        <button
          onClick={() => handlePdf("recharge")}
          className="font-san font-normal text-sm flex justify-center rounded-lg bg-[#634747]  items-center border border-solid py-3  w-[100px]"
        >
          Recharge List
        </button>
        <button
          onClick={() => handlePdf("paid")}
          className="font-san font-normal text-sm flex rounded-lg justify-center bg-[#634747]  items-center border border-solid py-3  w-[100px]"
        >
          Paid List
        </button>
        <button
          onClick={() => handlePdf("reminder")}
          className="font-san font-normal text-sm flex rounded-lg justify-center bg-[#634747]  items-center border border-solid py-3  w-[100px]"
        >
          Reminder List
        </button>
        <button
          onClick={() => handlePdf("todaypaidbill")}
          className="font-san font-normal text-sm flex rounded-lg justify-center bg-[#634747]  items-center border border-solid py-3  w-[100px]"
        >
          Today Bill Paid
        </button>
      </div>
      <h4
        onClick={click}
        className=" font-san bg-[#634747] mt-8 cursor-pointer px-4 py-1 rounded-xl text-white font-semibold text-basel mb-4"
      >
        Return
      </h4>
    </div>
  );
};

export default PdfDownloadButton;
