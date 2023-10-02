import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, set, push } from "firebase/database";

const TodayRecharge = () => {


  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [taka, setTaka] = useState("");
  const [paid, setPaid] = useState("");

  const db = getDatabase();

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
      set(push(ref(db, "todayRecharge/")), {
        name: name,
        area: area,
        taka: taka,
        rechargeBy: paid,
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
          <div className="flex flex-col gap-y-1">
            <div>
              {/* {Array.from({ length: count }, (_, i) => (
                  <> */}
              <h2 className=" mt-20 flex justify-center font-bold items-center font-san text-xl uppercase text-white ">
                Today Recharge
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
                  placeholder="Taka here"
                />
                <input
                  onChange={(e) => setPaid(e.target.value)}
                  value={paid}
                  className="py-1 px-2  w-[200px]   rounded-md outline-none text-black"
                  placeholder="Recharge by"
                />
                
              </div>
            
            </div>

            <div className="flex justify-center items-center font-san mt-5 font-bold text-base">
              <button onClick={handleData} className="text-white border py-1 px-2 rounded-md">
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

export default TodayRecharge;
