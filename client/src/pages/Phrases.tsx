import { IoMdAdd } from "react-icons/io";
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';



export default function Phrases() {
  const [query, setQuery] = useState<string>('');
  const handleSearch = () => {
    console.log('Searching for:', query);
  };

  return (
    <>
      <h1 className="font-black text-3xl text-start text-black ">Phrases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 mt-4 md:mt-7 w-[95%] mx-auto">
        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-4 text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-2 items-center mb-2">
          <IoMdAdd className="mr-1 text-[20px]" />
          Create Phrase

        </a>
        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-2 text-white text-[16px] font-[600] leading-[10px] py-4 rounded-xl flex justify-center px-2 items-center mb-2">
          <IoMdAdd className="mr-1 text-[20px]" />
          Update Phrases


        </a>
        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-2 text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-2 items-center mb-2">
          <IoMdAdd className="mr-1 text-[20px]" />
          Delete Phrases


        </a>
        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-2 text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-2 items-center mb-2">
          <IoMdAdd className="mr-1 text-[20px]" />
          View Phrases
        </a>
      </div>
      <div className="form-group flex mt-16 ">
      
        <input
        className={
          "input w-1/2 font-[900] shadow-2xl  text-[14px]  text-black placeholder:font-[900] placeholder:text-[black] "
        }
          type="text"
          aria-label="Defult"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query..."
        /> 
        <FaSearch  className="ml-2 mt-3 text=[14px]"/> 
        {/* <button
          className="ml-(-32) p-4 rounded-xl bg-[#1da1f2]"
          type="button" onClick={handleSearch}>
          <FaSearch />
        </button> */}
        
      </div>






    </>
  )
}
