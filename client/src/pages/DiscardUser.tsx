import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import UserCard from "../components/common/User";
import { IoMdAdd } from "react-icons/io";
import UserInterface from "../interface/NewUser";
import { AppContext } from "../context/Context";
import { API_URL } from "../constants/data";
import Card from './Card';
 

export default function Lawyers() {

  const { user: currentUser } = React.useContext(AppContext);
  const [data, setData] = React.useState<UserInterface[]>([]);


  const getAllUsers = React.useRef(() => { });

  getAllUsers.current = async () => {
    if (!currentUser.uid) {
      return;
    }
    const params = new URLSearchParams();
    params.append("uid", currentUser.uid);
    params.append("session", currentUser.session);
    params.append("token", currentUser.access_token);

    const response = await fetch(`${API_URL}/get-all-users?${params}`);
    const data = await response.json();
    setData(data);
  }


  React.useEffect(() => {
    getAllUsers.current();
  }, [currentUser]);

  const [query, setQuery] = useState<string>('');
  const handleSearch = () => {
    console.log('Searching for:', query);
  };

  return (
    <>
      <h1 className="font-black text-3xl text-start text-black ">Discord User
      </h1>
      {/* <div className=" grid justify-end grid-cols-1 sm:grid-cols-1 md:grid-cols-4    w-[95%] mx-auto">

        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-2 text-white mt-4  text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center">
          <IoMdAdd className="mr-3 text-[20px]" />
          Update

        </a>
        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-2  mt-4 text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center">
          <IoMdAdd className="mr-3 text-[20px]" />
          Delete

        </a>
        <a href="/dashboard/users/new-users" className="bg-[#002F53] ml-2 mt-4 text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center">
          <IoMdAdd className="mr-3 text-[20px]" />
          View

        </a>
      </div> */}
      < div className="form-group mt-16 ml-12">
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
        <button
          className="ml-2 p-4 rounded-xl bg-[#1da1f2]"
          type="button" onClick={handleSearch}>
          <FaSearch />
        </button>
       
      </div>
<Card />
      
      {/* <div className="flex flex-col md:flex-row mt-10">
        {
          data.length > 0 ? data.map((user, index) => {
            return <UserCard key={index} {...user} />;
          }) : <p>No Users</p>
        }
      </div> */}
    </>
  );
}
