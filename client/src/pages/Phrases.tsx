import React, { useState } from "react";
import InputSearch from "../components/input/InputSearch";
import { AppContext } from "../context/Context";
import axios from "axios";
import { API_URL } from "../constants/data";
import Phrases from "../interface/Phrases";
import PhraseCard from "../components/dashboard/phrases/PhraseCard";
import { IoMdAdd } from "react-icons/io";
import CreatePhrase from "../components/dashboard/phrases/CreatePhrase";
import PannelUser from "../interface/Paneluser";
import Loading from "../components/loader/Loading";

export default function PhrasesComponent() {
  const { user: currentUser } = React.useContext(AppContext);
  const [data, setData] = React.useState<Phrases[]>([]);
  const [data2, setData2] = React.useState<PannelUser[]>([]);

  const [query, setQuery] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
const [load, setLoad ] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);


  const getAllUsers = React.useRef(() => {});
  const getAllPhrases = React.useRef(() => {});

  getAllPhrases.current = async function () {
    if (!currentUser.uid) {
      return;
    }
    const params = new URLSearchParams({
      uid: currentUser.uid,
      session: currentUser.session,
      access_token: currentUser.access_token,
    });

    setLoad(true)
    const data = await axios
      .get(API_URL + "/phrases/all?" + params)
      .then((res) => res.data);
    if (data.message) {
      alert(data.message);
      return;
    }
    setLoad(false)
    setData(data);
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

      setLoad(true)
      const data = await axios
        .get(API_URL + "/panel-user/all?" + params)
        .then((res) => res.data)
        .catch((err) => {
          alert(err.response.data.message);
          return;
        });
      const users = data.filter((user: PannelUser) => user.uid !== currentUser.uid);
      setLoad(false)
      setData2(users);
    } catch (err) {}
  };

  React.useEffect(() => {
    getAllPhrases.current();
    getAllUsers.current();
  }, [currentUser]);

  return (
    <>
    {load && <Loading />}
      <h1 className="font-black text-3xl text-start text-black ">Phrases</h1>
      <div
        className="bg-[#002F53] text-white text-[16px] font-[600] leading-[20px] rounded-md mt-4 flex justify-center items-center mb-2 w-fit px-4 py-2 cursor-pointer"
        onClick={() => setIsPopupOpen(true)}
      >
        <IoMdAdd className="mr-2 text-[20px] " />
        Create
      </div>
      <InputSearch
        name="search"
        defValue=""
        placeholder="Search"
        inputClassName="md:w-1/2 w-11/12 mx-auto"
        onChangeHandler={(e) => setQuery(e.target.value)}
      />
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-[95%] mx-auto">
          {data
            .filter((user: Phrases) =>
              user.phrase.toLowerCase().includes(query.toLowerCase())
            )
            .map((user) => (
              <PhraseCard key={user.phrase_id} phrase={user} approver={data2} />
            ))}
        </div>
      ) : (
        <p className="text-center my-4">No user found</p>
      )}
      <CreatePhrase
        isOpen={isPopupOpen}
        approverData={data2}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}
