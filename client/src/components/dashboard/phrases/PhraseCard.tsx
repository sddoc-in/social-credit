import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

import { CiEdit } from "react-icons/ci";
import Phrases from "../../../interface/Phrases";
import Delete from "./Delete";
import React from "react";
import { AppContext } from "../../../context/Context";
import EditPhrase from "./EditPhrase";
import PannelUser from "../../../interface/Paneluser";
import axios from "axios";
import { API_URL } from "../../../constants/data";
export default function PhraseCard(props: {
  phrase: Phrases;
  approver: PannelUser[];
}) {

  
  const {theme} = React.useContext(AppContext)

  let boxTheme = theme === 'light'?"bg-transparent ": "bg-[#002F53] text-white"

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [approver, setApprover] = React.useState<string>("");

  const { user: currentUser } = React.useContext(AppContext);

  async function deletePhrase(data: Phrases) {
    if (!currentUser.uid) {
      return;
    }

    try {
      const params = new URLSearchParams({
        approver: approver,
        uid: currentUser.uid,
        phrase_id: props.phrase.phrase_id || "",
        access_token: currentUser.access_token,
        session: currentUser.session,
      });

      const data = await axios
        .delete(API_URL + "/phrase/delete?" + params)
        .then((res) => res.data)
        .catch((err) => {
          let data = err.response.data;
          alert(data.message);
          return;
        });

      if (
        data.message !== "Phrase Deleted successfully." &&
        data.message !== "Approver Sent successfully"
      ) {
        alert(data.message)
        console.log("xsx")
        return;
      }
      alert(data.message);
      setOpen(false);
      window.location.reload();
    } catch (err) {}
  }

  function openModal() {
    setOpen(true);
  }

  function editPhrase() {
    setEdit(true);
  }

  function onRoleChange(name: string, value: string) {
    setApprover(value);
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
              <p className="mx-3">{props.phrase.phrase} </p>
              <div className="flex items-center">
                <FaStar className="text-2xl text-blue-400" />{" "}
                <p className="ml-1">{props.phrase.points} </p>
              </div>
            </div>
          </div>
          <hr className="w-full h-1 " />
          <div className="flex justify-evenly items-center mt-2">
            <a href={"phrase/details/view/" + props.phrase.phrase_id}>
              <FaRegEye className="text-2xl mt-1.5" />
            </a>
            {/* add pop for decreasing points */}
            <CiEdit
              onClick={editPhrase}
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
        data={props.phrase}
        onDelete={deletePhrase}
        type="phrase"
        approverData={props.approver}
        setApprover={onRoleChange}
      />
      <EditPhrase
        isOpen={edit}
        onClose={() => setEdit(false)}
        data={props.phrase}
        approver={props.approver}
      />
    </>
  );
}
