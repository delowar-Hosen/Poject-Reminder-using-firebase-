import React, { useState } from "react";

const TodayBillPaid = () => {
  const [number, setNumber] = useState("");
  const [count, setCount] = useState("");
  const [err, setErr] = useState("");

  let handleCount = (number) => {
    if (!number) {
      setErr("Please give total bill number");
    }
    setCount(number);
  };

  return (
    <div className="bg-[#0000008a] w-full h-screen">
      <div className="flex justify-center items-center ">
        <div className=" mt-4 flex flex-col gap-y-1  font-san text-base w-[750px] h-[600px]  font-normal">
          {!count > 0 && (
            <div className="font-san pb-2 font-semibold text-base flex justify-center  items-center ">
              <h4 className="text-white">Total Bill Count :</h4>
              <input
                onChange={(e) => setNumber(e.target.value)}
                className="py-1 px-2 ml-2 rounded-md outline-none"
                placeholder="Enter bill number"
              />
              <button
                onClick={() => handleCount(number)}
                className="font-san text-white font-normal py-1 px-2 border ml-2 rounded-md"
              >
                Submit
              </button>
            </div>
          )}

          {Array.from({ length: count }, (_, i) => (
            <>
              <div>
                <span className="text-white w-[40px] inline-block " key={i}>
                  {i + 1}.
                </span>{" "}
                <input
                  className="py-1 px-2 rounded-md capitalize outline-none  mr-2"
                  placeholder="Name here"
                />
                =
                <input
                  className="py-1 px-2 rounded-md capitalize outline-none ml-2 mr-2"
                  placeholder="Area name"
                />
                =
                <input
                  className="py-1 px-2 rounded-md ml-2 outline-none"
                  placeholder="taka here"
                />
              </div>
            </>
          ))}
          <div className="border-t font-san text-base font-semibold flex text-white justify-between pt-2">
            <p>Paid By : <input className="py-1 px-2 rounded-md outline-none text-black" placeholder="Paid by" /></p>
            <h4 className="mr-[305px]">Total = </h4>
          </div>
          <div className="flex justify-center items-center font-san mt-5 font-bold text-base">
            <button className="text-white border py-1 px-2 rounded-md">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayBillPaid;
