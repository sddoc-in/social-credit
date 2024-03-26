import { IoMdAdd } from "react-icons/io";
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function PanelUser() {
  
  return (
    <>
     <h1 className="font-black text-3xl text-start text-black ">Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 mt-4 md:mt-7 w-[95%] mx-auto">
       
        
    

      <a href="/dashboard/users/new-users" className="bg-[#002F53]  text-white text-[16px] font-[600] leading-[20px] rounded-xl flex justify-center items-center mb-2">
        <IoMdAdd className="mr-2 text-[20px]" />
        Create

        </a>
        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-4 text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center mb-2">
        <IoMdAdd className="mr-3 text-[20px]" />
          Update

        </a>
        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-4 text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center mb-2">
        <IoMdAdd className="mr-3 text-[20px]" />
         Delete

        </a>
        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-4 text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center mb-2">
        <IoMdAdd className="mr-3 text-[20px]" />
        View 

        </a>
        </div>
     
    </>
  );
}
