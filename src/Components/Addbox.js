import React, { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";

const Addbox = () => {
  const [cName, setCName] = useState("");
  const [fName, setFName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [iD, setID] = useState("");
  const [boxId, setBoxId] = useState("");
  const [bill, setBill] = useState("");
  const [price, setPrice] = useState("");
  const [mName, setMName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const db = getDatabase();

  let handleClientName = (e) => {
    setCName(e.target.value);
    setErr("");
  };

  let handleFaterName = (e) => {
    setFName(e.target.value);
    setErr("");
  };

  let handlePhone = (e) => {
    setPhone(e.target.value);
    setErr("");
  };

  let handleArea = (e) => {
    console.log(e.target.value);
    setErr("");
  };

  let handleId = (e) => {
    setID(e.target.value);
    setErr("");
  };

  let handleBoxId = (e) => {
    setBoxId(e.target.value);
    setErr("");
  };

  let handleBill = (e) => {
    setBill(e.target.value);
    setErr("");
  };

  let handlePrice = (e) => {
    setPrice(e.target.value);
    setErr("");
  };

  let handleAreaManagerName = (e) => {
    setMName(e.target.value);
    setErr("");
  };

  let handleIssueDate = (e) => {
    setIssueDate(e.target.value);
    setErr("");
  };

  let handleSubmit = () => {
    if (!cName) {
      setErr("Please Give Valid Client Name");
    } else if (!fName) {
      setErr("");
      setErr("Please Give A Valid Client Father Name");
    } else if (!phone) {
      setErr("Please Give A Valid Phone Number");
    } else if (phone.length < 11) {
      setErr("");
      setErr("BDPhone Number Must Be 11 Charcter");
    } else if (!area) {
      setErr("");
      setErr("Please Select An Area");
    } else if (!iD) {
      setErr("");
      setErr("Please Give Give Customer National Id Number");
    } else if (!boxId) {
      setErr("");
      setErr("Please Give Box Id Number");
    } else if (boxId.length < 5) {
      setErr("");
      setErr("Please Give Box Id Number At least 5 Charcter");
    } else if (!bill) {
      setErr("");
      setErr("Please Select Monthly Bill");
    } else if (!price) {
      setErr("");
      setErr("Please Give Box Price");
    } else if (!mName) {
      setErr("");
      setErr("Please Select Area Manager Name");
    }

    if (
      cName &&
      fName &&
      phone &&
      !phone.length < 11 &&
      area &&
      iD &&
      boxId &&
      !boxId.length < 5 &&
      bill &&
      price &&
      mName
    ) {
      set(push(ref(db, "boxusers/")), {
        clientName: cName,
        fatherName: fName,
        phone: phone,
        clientNationId: iD,
        boxId: boxId,
        areaname: area,
        montlyBill: bill,
        boxPrice: price,
        managername: mName,
        issueDate: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
      })
        .then(() => {
          setErr("");
          setSuccess(
            "Your Set-Top Box Add Successfully,Please Give The Correct Information To create Another Box Id"
          );

          setTimeout(() => {
            setSuccess("");
            setCName("");
            setFName("");
            setPhone("");
            setArea("");
            setBoxId("");
            setBill("");
            setID("");
            setErr("");
            setPrice("");
            setMName("");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="p-5 w-[90%] m-auto">
      <h2 className="font-san font-bold text-5xl text-black text-center">
        User Information
      </h2>
      <div>
        {err && (
          <p className="font-san font-bold text-lg py-2 rounded-[10px] uppercase bg-red-400 text-white w-full text-center">
            {err}
          </p>
        )}
        {success && (
          <p className="font-san font-bold text-lg py-2 uppercase rounded-[10px]   bg-green-400 text-white w-full text-center">
            {success}
          </p>
        )}
      </div>
      <div className="flex justify-between mt-20 ">
        <p className="font-san font-bold text-lg uppercase ">
          Client Name :
          <input
            onChange={handleClientName}
            value={cName}
            className="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
            placeholder="Enter Client Name"
          />
        </p>
        <p className="font-san font-bold text-lg uppercase">
          Client Father/Husband Name :
          <input
            onChange={handleFaterName}
            value={fName}
            className="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
            placeholder="Enter Client Father/Husband Name"
          />
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <p className="font-san font-bold text-lg uppercase">
          Client Phone Number :
          <input
            onChange={handlePhone}
            value={phone}
            className="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
            placeholder="Enter Client Phone Number"
          />
        </p>

        <p className="font-san font-bold text-lg uppercase">
          Client Area Name :{" "}
          <select
            onChange={handleArea}
            id="countries"
            class="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
          >
            <option selected>Choose a Area</option>
            <option value="Bisra Kandi">Bisra Kandi</option>
            <option value="Uttar Kulaura">Uttar Kulaura</option>
            <option value="Hid Road">Hid Road</option>
            <option value="Dakirpur">DakirPur</option>
            <option value="Joi Chondi">JoiChondi</option>
          </select>
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <p className="font-san font-bold text-lg uppercase">
          Client National Id Number :
          <input
            onChange={handleId}
            value={iD}
            className="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
            placeholder="Enter Client National Id Number"
          />
        </p>
        <p className="font-san font-bold text-lg uppercase">
          Box Id Number :
          <input
            onChange={handleBoxId}
            value={boxId}
            className="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
            placeholder="Enter Box Id Number"
          />
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <p className="font-san font-bold text-lg uppercase">
          Box Price :
          <input
            onChange={handlePrice}
            value={price}
            className="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
            placeholder="Enter Client National Id Number"
          />
        </p>
        <p className="font-san font-bold text-lg uppercase">
          Monthly Bill :
          <input
            onChange={handleBill}
            value={bill}
            className="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
            placeholder="Enter Monthly Bill"
          />
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <p className="font-san font-bold text-lg uppercase">
          Area Manager Name :
          <input
            onChange={handleAreaManagerName}
            value={mName}
            className="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
            placeholder="Area Manager Name"
          />
        </p>
        <p className="font-san font-bold text-lg uppercase">
          Issue Date :
          <input
            onChange={handleIssueDate}
            value={issueDate}
            className="font-san font-semibold ml-3 text-lg py-3 px-2  w-[400px] uppercase  placeholder:text-center placeholder:font-san placeholder:font-medium placeholder:text-base border border-solid "
            placeholder="Enter Isssue Date"
          />
        </p>
      </div>
      <div className="text-center mt-10">
        <button
          onClick={handleSubmit}
          className="font-san font-bold text-lg py-3 px-4 rounded-lg bg-black text-white uppercase"
        >
          Submit Information
        </button>
      </div>
    </div>
  );
};

export default Addbox;
