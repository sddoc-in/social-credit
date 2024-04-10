import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

import { CiEdit } from "react-icons/ci";
import DiscordUser from "../../../interface/DiscordUser";
import React from "react";
import Delete from "../../reusable/Delete";
export default function Card(props: DiscordUser) {
  const [open, setOpen] = React.useState(false);

  function deletePhrase(data: DiscordUser) {
    console.log(data);
  }

  function openModal() {
    setOpen(true);
    console.log("called");
  }
  return (
    <>
      <section className="text-gray-600 body-font mt-8 ">
        <div className="border border-gray-200 p-5 rounded-lg shadow-xl ">
          <div className="flex justify-start items-center w-full mb-4">
            <div className="p-1 rounded-full bg-indigo-100 text-indigo-500 ">
              <FaCircleUser className="text-3xl" />
            </div>
            <div className="flex justify-center ">
              <p className="mx-3">{props.username} </p>
              <div className="flex items-center">
                <FaStar className="text-2xl text-blue-400" />{" "}
                <p className="ml-1">{props.total_points} </p>
              </div>
            </div>
          </div>
          <hr className="w-full h-1 " />
          <div className="flex justify-evenly items-center mt-2">
            <a href={"user/discord/details/view/" + props.userId}>
              <FaRegEye className="text-2xl mt-1.5" />
            </a>
            {/* add pop for decreasing points */}
            <CiEdit className="text-2xl mt-1.5 cursor-pointer" />

            {/* add popup for deleteing the user */}
            <MdDeleteForever
              onClick={openModal}
              className="text-2xl mt-1.5 text-rose-500 cursor-pointer"
            />
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
    </>
  );
}
