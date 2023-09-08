import React, { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

const TodayBillPaid = () => {
  const [number, setNumber] = useState("");
  const [count, setCount] = useState("");
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [taka, setTaka] = useState("");
  const [paid, setPaid] = useState("");
  const [data, setData] = useState([]);

  const db = getDatabase();
  const auth = getAuth();

  // let handleCount = (number, paid) => {
  //   if (!number) {
  //     setErr("Please give total bill number");
  //   } else if (!paid) {
  //     setErr("Please give who recived money and memo");
  //   }
  //   console.log("nuumber", number, "paid", paid);
  //   setCount(number);
  // };

  let handleData = () => {
    if (!name) {
      console.log("Please fill name ");
    } else if (!area) {
      console.log("Please fill area ");
    } else if (!taka) {
      console.log("Please fill taka ");
    } else if (!paid) {
      console.log("Please fill Paid by ");
    } else {
      set(push(ref(db, "everdayBillPaid/")), {
        name: name,
        area: area,
        taka: taka,
        paidBy: paid,
        date: new Date().toLocaleDateString(),
      }).then(() => {
        setName("");
        setArea("");
        setPaid("");
        setTaka("");
      });
    }
  };

  return (
    <div className="bg-[#0000008a] w-full h-screen">
      <div className="flex justify-center items-center  ">
        <div className=" mt-4   font-san text-base w-[750px] h-[600px]  font-normal">
          {/* {!count > 0 && (
            <>
              <div className="font-san pb-2 font-semibold text-base gap-y-1 flex flex-col justify-center  items-center ">
                <div className="flex">
                  <h4 className="text-white">Total Bill Count :</h4>
                  <input
                    onChange={(e) => setNumber(e.target.value)}
                    className="py-1 px-2 ml-2 rounded-md outline-none"
                    placeholder="Enter bill number"
                  />
                </div>

                <div className="flex text-white ml-[65px]">
                  <p>
                    Paid By :{" "}
                    <input
                      onChange={(e) => setPaid(e.target.value)}
                      className="py-1 px-2  rounded-md outline-none text-black"
                      placeholder="Paid by"
                    />
                  </p>
                </div>
                <button
                  onClick={() => handleCount(number, paid)}
                  className="font-san  text-white font-normal py-1 px-2 border mt-2 ml-[120px] rounded-md"
                >
                  Submit
                </button>
              </div>
            </>
          )} */}
          {/* {count.length > 0 && ( */}
          <div className="flex flex-col gap-y-1">
            <div>
              {/* {Array.from({ length: count }, (_, i) => (
                  <> */}
              <h2 className="flex justify-center font-bold items-center font-san text-base text-white capitalize underline">
                Today Bill Paid
              </h2>
              <div className="mb-1 mt-10 flex gap-y-2 flex-col justify-center items-center">
                <span className="text-white w-[40px] inline-block "></span>{" "}
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className=" w-[200px] py-1 px-2 rounded-md capitalize outline-none  "
                  placeholder="Name here"
                />
                <input
                  onChange={(e) => setArea(e.target.value)}
                  value={area}
                  className="py-1 px-2 w-[200px] rounded-md capitalize outline-none ml-2 mr-2"
                  placeholder="Area name"
                />
                <input
                  onChange={(e) => setTaka(e.target.value)}
                  value={taka}
                  className="py-1 w-[200px] px-2 rounded-md  outline-none"
                  placeholder="taka here"
                />
                <input
                  onChange={(e) => setPaid(e.target.value)}
                  value={paid}
                  className="py-1 px-2  w-[200px]   rounded-md outline-none text-black"
                  placeholder="Paid by"
                />
              </div>
              {/* </> */}
              {/* ))} */}
            </div>

            <div className="flex justify-center items-center font-san mt-5 font-bold text-base">
              <button
                onClick={handleData}
                className="text-white border py-1 px-2 rounded-md"
              >
                Submit
              </button>
              <Link to="/rechargelist">
                <button className="text-white border ml-2 py-1 px-2 rounded-md">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default TodayBillPaid;
