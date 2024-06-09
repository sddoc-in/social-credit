import React from "react";
import { FaStar, FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Delete from "../../reusable/Delete";
import { AppContext } from "../../../context/Context";
import getAllWhiteLitedInterface from "../../../interface/getAllWhiteLited";
import UpdateWhitelistedPopup from "./UpdateWhiteListed";

export default function WhiteListedCard(props: { data: getAllWhiteLitedInterface }) {
  const { theme } = React.useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  let boxTheme = theme === 'light' ? "bg-transparent" : "bg-[#002F53] text-white";

  function deletePhrase(data: getAllWhiteLitedInterface) {
    console.log(data);
  }

  return (
    <>
      <section className={"text-gray-600 body-font mt-8 rounded-lg " + boxTheme}>
        <div className="border border-gray-200 p-5 rounded-lg shadow-xl">
          <div className="flex justify-start items-center w-full mb-4">
            <div className="p-1 rounded-full bg-indigo-100 text-indigo-500">
              {/* <FaCircleUser className="text-3xl" /> */}
            </div>
            <div className="flex justify-center ml-3">
              <p className="text-lg font-semibold">{props.data.username}</p>
              <div className="flex items-center ml-3">
                <FaStar className="text-2xl text-blue-400" />
                <p className="ml-1">{props.data.role}</p>
              </div>
            </div>
          </div>
          <hr className="w-full h-1" />
          <div className="mt-2">
            <p className="text-sm text-gray-500">UUID: {props.data.uuid}</p>
          </div>
          <div className="flex justify-evenly items-center mt-4">
            <FaRegEye className="text-2xl mt-1.5" />
            <CiEdit onClick={() => setEdit(true)} className="text-2xl mt-1.5 cursor-pointer" />
            <MdDeleteForever onClick={() => setOpen(true)} className="text-2xl mt-1.5 text-rose-500 cursor-pointer" />
          </div>
        </div>
      </section>
      <Delete
        isOpen={open}
        onClose={() => setOpen(false)}
        data={props.data}
        onDelete={deletePhrase}
        type="white-listed-user"
      />
      <UpdateWhitelistedPopup
        isOpen={edit}
        onClose={() => setEdit(false)}
        data={props.data}
      />
    </>
  );
}
