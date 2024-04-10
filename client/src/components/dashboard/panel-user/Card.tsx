import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";

import { CiEdit } from "react-icons/ci";
import React from "react";
import Delete from "../../reusable/Delete";
import PannelUser from "../../../interface/Paneluser";
import { AppContext } from "../../../context/Context";
import { API_URL } from "../../../constants/data";
import axios from "axios";
import UpdateUserPopup from "./UpdateUserPopup";

export default function Card(props: PannelUser) {
  const { user: currentUser } = React.useContext(AppContext);

  const [open, setOpen] = React.useState(false);
  const [updatePopup, setUpdatePopup] = React.useState(false);

  async function deletePhrase() {
    if (!currentUser.uid) {
      return;
    }

    if(!currentUser.role || currentUser.role !== "supreme_leader"){
      alert("You are not authorized to delete a user");
      return;
    }

    try {
      const params = new URLSearchParams({
        uid: currentUser.uid,
        session: currentUser.session,
        access_token: currentUser.access_token,
        puid: props.uid,
      });

      await axios
        .delete(API_URL + "/panel-user/delete?" + params)
        .then((res) => res.data)
        .catch((err) => {
          alert(err.response.data.message);
          return;
        });
      setOpen(false);
      window.location.reload();
    } catch (err) {}
  }

  function openModal() {
    setOpen(true);
  }
  return (
    <>
      <section className="text-gray-600 body-font mt-8 ">
        <div className="border border-gray-200 p-5 rounded-lg shadow-xl ">
          <div className="flex justify-start items-start mb-4 w-11/12">
            <div className="p-1 rounded-full bg-indigo-100 text-indigo-500 ">
              <FaCircleUser className="text-3xl" />
            </div>
            <div>
              <div className="flex justify-start items-center ml-3">
                <p>{props.name} -</p>
                <p className="ml-1">{props.username} </p>
              </div>
              <div className="ml-3 text-ellipsis w-full">
                <p>{props.email} </p>
              </div>
            </div>
          </div>
          <hr className="w-full h-1 " />
          <div className="flex justify-evenly items-center mt-2">
            <a href={"/dashboard/panel-user/details/view/" + props.uid}>
              <FaRegEye className="text-2xl mt-1.5" />
            </a>
            {/* add pop for decreasing points */}
            <CiEdit
              onClick={() => setUpdatePopup(true)}
              className="text-2xl mt-1.5 cursor-pointer"
            />

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
        type="panel-user"
      />
      <UpdateUserPopup
        isOpen={updatePopup}
        onClose={() => setUpdatePopup(false)}
        data={props}
      />
    </>
  );
}
