import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="bg-slate-200 rounded-md p-2 flex items-center gap-4 text-md w-[300px]">
      <FaSearch className="text-gray-500" />
      <input
        className="bg-transparent outline-none"
        type="text"
        placeholder="جستجو"
      />
    </div>
  );
}

export default SearchBar;
