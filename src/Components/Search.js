import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = ({ state }) => {
  return (
    <div className="relative  lg:w-[400px] mt-10 mb-2 rounded-md">
      <input
        onChange={state}
        className="font-san relative font-normal text-base py-2 px-5 w-[300px] lg:w-[400px] border border-solid   placeholder:font-san placeholder:font-normal placeholder:text-sm"
        placeholder="search with ID ,Name and Number"
      />
      <BsSearch className=" absolute top-3.5 lg:top-3 right-16 lg:right-5" />
    </div>
  );
};

export default Search;
