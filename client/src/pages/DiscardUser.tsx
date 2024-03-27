import React, { useState } from 'react';
import UserInterface from "../interface/NewUser";
import { AppContext } from "../context/Context";
import { API_URL } from "../constants/data";
import Card from './Card';


export default function Discord() {

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
      <form className="flex items-center  mt-20 max-w-sm mx-auto">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search user name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          onClick={handleSearch}
          type="button"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <Card />
    </>
  );
}
