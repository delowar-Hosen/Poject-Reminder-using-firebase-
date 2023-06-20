import React, { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import { useSelector } from "react-redux";

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
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const db = getDatabase();
  let auth = useSelector((item) => item.auth.value);
  const{name}=auth[0]
  

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
    setArea(e.target.value);
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

  let handlePrice = (e) => {
    setPrice(e.target.value);
    setErr("");
  };

  let handleSubmit = () => {
    if (!cName) {
      setErr("Please Give Valid Client Name");
    }else if (!phone) {
      setErr("Please Give A Valid Phone Number");
    } else if (phone.length < 11) {
      setErr("");
      setErr("BDPhone Number Must Be 11 Charcter");
    } else if (!area) {
      setErr("");
      setErr("Please Select An Area");
    } else if (!boxId) {
      setErr("");
      setErr("Please Give Box Id Number");
    } else if (boxId.length < 5) {
      setErr("");
      return setErr("Please Give Box Id Number At least 5 Charcter");
    } 

    if (
      cName &&
      phone &&
      !phone.length <= 11 &&
      area &&
      boxId &&
      !boxId.length <= 5 
    ) {
      set(push(ref(db, "boxusers/")), {
        clientName: cName,
        fatherName: fName ? fName : "NA",
        phone: phone,
        clientNationId: iD?iD:"NA",
        boxId: boxId,
        areaname: area,
        montlyBill: 300,
        boxPrice: price?price:"NA",
        managername: name,
        issueDate: `${new Date().toLocaleDateString()}`,
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
    <div className="p-2 w-[700px] m-auto">
      <h2 className="font-san font-bold mb-2 text-2xl text-black text-center">
        User Information
      </h2>
      <div className="flex items-center justify-center mx-5">
        {err && (
          <p className="font-san font-semibold text-sm py-1 mb-1 rounded-[10px] uppercase bg-red-400 text-white w-full text-center">
            {err}
          </p>
        )}
        {success && (
          <p className="font-san font-semibold text-sm mb-2 py-2 uppercase rounded-[10px]   bg-green-400 text-white w-full text-center">
            {success}
          </p>
        )}
      </div>
      <div className="w-[600px] m-auto bg-[#1e2833] text-white p-2 rounded-md">
        <div>
          <p className="font-san flex items-center justify-between font-semibold text-sm uppercase mt-4 ">
            Client Name :
            <input
              onChange={handleClientName}
              value={cName}
              className="font-san font-normal w-[350px] ml-1 rounded-lg  text-sm  px-12 py-2  capitalize text-black  placeholder:text-center placeholder:font-san placeholder:font-normal placeholder:text-sm border border-solid "
              placeholder="Client Name"
            />
          </p>
          <p className="font-san flex items-center justify-between font-semibold text-sm uppercase mt-4 ">
            Client Father/Husband Name :
            <input
              onChange={handleFaterName}
              value={fName}
              className="font-san font-normal w-[350px] ml-1 rounded-lg  text-sm  px-12 py-2  capitalize text-black  placeholder:text-center placeholder:font-san placeholder:font-normal placeholder:text-sm border border-solid "
              placeholder="Father/Husband Name"
            />
          </p>
          <p className="font-san flex items-center justify-between font-semibold text-sm uppercase mt-4 ">
            Client Phone Number :
            <input
              onChange={handlePhone}
              value={phone}
              className="font-san font-normal w-[350px] ml-1 rounded-lg  text-sm  px-12 py-2  capitalize text-black  placeholder:text-center placeholder:font-san placeholder:font-normal placeholder:text-sm border border-solid "
              placeholder="Enter Client Phone Number"
            />
          </p>

          <p className="font-san flex items-center justify-between font-semibold text-sm uppercase mt-4 ">
            Client Area Name :{" "}
            <select
              onChange={handleArea}
              id="countries"
              className="font-san font-normal w-[350px] ml-1 rounded-lg  text-sm  px-12 py-2  capitalize text-black  placeholder:text-center placeholder:font-san placeholder:font-normal placeholder:text-sm border border-solid text-center "
            >
              <option selected>Choose a Area</option>
              <option value="Bisra Kandi">Bisra Kandi</option>
              <option value="Uttar Kulaura">Uttar Kulaura</option>
              <option value="Hid Road">Hid Road</option>
              <option value="Dakirpur">DakirPur</option>
              <option value="Joi Chondi">JoiChondi</option>
            </select>
          </p>
          <p className="font-san flex items-center justify-between font-semibold text-sm uppercase mt-4 ">
            Box Id Number :
            <input
              onChange={handleBoxId}
              value={boxId}
              className="font-san font-normal w-[350px] ml-1 rounded-lg  text-sm  px-12 py-2  capitalize text-black  placeholder:text-center placeholder:font-san placeholder:font-normal placeholder:text-sm border border-solid "
              placeholder="Enter Box Id Number"
            />
          </p>
          <p className="font-san flex items-center justify-between font-semibold text-sm uppercase mt-4 ">
            Box Price :
            <input
              onChange={handlePrice}
              value={price}
              className="font-san font-normal w-[350px] ml-1 rounded-lg  text-sm  px-12 py-2  capitalize text-black  placeholder:text-center placeholder:font-san placeholder:font-normal placeholder:text-sm border border-solid "
              placeholder="Enter Client National Id Number"
            />
          </p>
          <p className="font-san flex items-center justify-between font-semibold text-sm uppercase mt-4 ">
            Client National Id Number :
            <input
              onChange={handleId}
              value={iD}
              className="font-san font-normal w-[350px] ml-1 rounded-lg  text-sm  px-12 py-2  capitalize text-black  placeholder:text-center placeholder:font-san placeholder:font-normal placeholder:text-sm border border-solid "
              placeholder="Enter Client National Id Number"
            />
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <button
          onClick={handleSubmit}
          className="font-san font-bold   text-base py-2 px-2 rounded-lg bg-[#634747] text-white uppercase"
        >
          Submit Information
        </button>
      </div>
    </div>
  );
};

export default Addbox;
