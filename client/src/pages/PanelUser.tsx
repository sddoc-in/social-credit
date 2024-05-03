import { IoMdAdd } from "react-icons/io";
import React, { useState } from "react";
import { AppContext } from "../context/Context";
import PannelUser from "../interface/Paneluser";
import CreateuserPopup from "../components/dashboard/panel-user/CreateuserPopup";
import { API_URL } from "../constants/data";
import axios from "axios";
import Card from "../components/dashboard/panel-user/Card";

export default function PanelUser() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user: currentUser,headingTheme,buttonTheme } = React.useContext(AppContext);
  const [data, setData] = React.useState<PannelUser[]>([]);
  const getAllUsers = React.useRef(() => {});

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  getAllUsers.current = async function () {
    if (!currentUser.uid) {
      return;
    }
    try {
      const params = new URLSearchParams({
        uid: currentUser.uid,
        session: currentUser.session,
        access_token: currentUser.access_token,
      });

      const data = await axios
        .get(API_URL + "/panel-user/all?" + params)
        .then((res) => res.data)
        .catch((err) => {
          alert(err.response.data.message);
          return;
        });
      if (data.message) {
        alert(data.message);
        return;
      }
      setData(data);
    } catch (err) {}
  };

  React.useEffect(() => {
    getAllUsers.current();
  }, [currentUser]);

  return (
    <>
      <h1 className={"font-black text-3xl text-start "+headingTheme}>Panel</h1>
      <div
        className={" text-white text-[16px] font-[600] leading-[20px] rounded-md mt-4 flex justify-center items-center mb-2 w-fit px-4 py-2 cursor-pointer " + buttonTheme}
        onClick={openPopup}
      >
        <IoMdAdd className="mr-2 text-[20px] " />
        Create
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-[95%] mx-auto">
          {data.map((user: PannelUser, index: number) => {
            return <Card key={index} {...user} />;
          })}
        </div>
      ) : (
        <p className="text-center my-4">No user found</p>
      )}

      <CreateuserPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}
