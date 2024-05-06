import { FaRegEye } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

import { CiEdit } from "react-icons/ci";
import DiscordUser from "../../../interface/DiscordUser";
import React from "react";
import Delete from "../../reusable/Delete";
import UpdateUserPopup from "./UpdateUserPopup";
import PannelUser from "../../../interface/Paneluser";
import { AppContext } from "../../../context/Context";
export default function Card(props: {data:DiscordUser,panelUser:PannelUser[]}) {

  const {theme} = React.useContext(AppContext)

  let boxTheme = theme === 'light'?"bg-transparent ": "bg-[#002F53] text-white"

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  function deletePhrase(data: DiscordUser) {
    console.log(data);
  }

  return (
    <>
      <section className={"text-gray-600 body-font mt-8  rounded-lg "+boxTheme}>
        <div className="border border-gray-200 p-5 rounded-lg shadow-xl ">
          <div className="flex justify-start items-center w-full mb-4">
            <div className="p-1 rounded-full bg-indigo-100 text-indigo-500 ">
              <FaCircleUser className="text-3xl" />
            </div>
            <div className="flex justify-center ">
              <p className="mx-3">{props.data.username} </p>
              <div className="flex items-center">
                <FaStar className="text-2xl text-blue-400" />{" "}
                <p className="ml-1">{props.data.total_points} </p>
              </div>
            </div>
          </div>
          <hr className="w-full h-1 " />
          <div className="flex justify-evenly items-center mt-2">
            <a href={"user/discord/details/view/" + props.data.userId}>
              <FaRegEye className="text-2xl mt-1.5" />
            </a>
            {/* add pop for decreasing points */}
            <CiEdit 
              onClick={() => setEdit(true)}
              className="text-2xl mt-1.5 cursor-pointer" />

            {/* add popup for deleteing the user */}
            {/* <MdDeleteForever
              onClick={openModal}
              className="text-2xl mt-1.5 text-rose-500 cursor-pointer"
            /> */}
          </div>
        </div>
      </section>
      <Delete
        isOpen={open}
        onClose={() => setOpen(false)}
        data={props}
        onDelete={deletePhrase}
        type="discord-user"
      />
      <UpdateUserPopup
        isOpen={edit}
        onClose={() => setEdit(false)}
        data={props.data}
        panelUser={props.panelUser}
      />
    </>
  );
}
