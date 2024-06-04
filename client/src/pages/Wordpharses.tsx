import React from "react";
import { AppContext } from "../context/Context";
import WordphrasesInterface from "../interface/wordphrases";
import { API_URL } from "../constants/data";
import axios from "axios";
import Loading from "../components/loader/Loading";
import Card from "../components/dashboard/panel-user/Card";
import CreateuserPopup from "../components/dashboard/panel-user/CreateuserPopup";
import { IoMdAdd } from "react-icons/io";

export default function WordphrasesPage() {
  const { user: currentUser, buttonTheme } = React.useContext(AppContext);
  const [data, setData] = React.useState<WordphrasesInterface[]>([]);
  const [load, setLoad] = React.useState(true);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const getAllWordPhrases = React.useCallback(async () => {
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
        .get(API_URL + "/wordphrases/all?" + params)
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
    }
    catch (err) {}
  }
  , [currentUser]);
  React.useEffect(() => {
    getAllWordPhrases();
  }, [getAllWordPhrases]);

  return (
    <>
      {load && <Loading />}
      <h1 className="font-black text-3xl text-start text-black">Panel</h1>
      <div
        className={
          "text-white text-[16px] font-[600] leading-[20px] rounded-md mt-4 flex justify-center items-center mb-2 w-fit px-4 py-2 cursor-pointer " +
          buttonTheme
        }
        onClick={() => setIsPopupOpen(true)}
      >
        <IoMdAdd className="mr-2 text-[20px]" />
        Create
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-[95%] mx-auto">
          {data.map((wordphrase: WordphrasesInterface, index: number) => (
            <Card key={index} {...wordphrase} />
          ))}
        </div>
      ) : (
        <p className="text-center my-4">No wordphrases found</p>
      )}

      <CreateuserPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}
