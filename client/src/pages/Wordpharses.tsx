import React from "react";
import { AppContext } from "../context/Context";
import WordphrasesInterface from "../interface/wordphrases";
import { API_URL } from "../constants/data";
import axios from "axios";
import Loading from "../components/loader/Loading";
import { IoMdAdd } from "react-icons/io";

export default function WordphrasesPage() {
  const { user: currentUser, buttonTheme } = React.useContext(AppContext);
  const [data, setData] = React.useState<WordphrasesInterface[]>([]);
  const [load, setLoad] = React.useState(true);

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

      const response = await axios.get(API_URL + "/wordphrases/all?" + params);
      const data = response.data;
      if (data.message) {
        alert(data.message);
        return;
      }
      setData(data);
      setLoad(false); // Set loading to false after data is fetched
    } catch (err) {
      alert("Error fetching data");
      setLoad(false); // Set loading to false if there's an error
    }
  }, [currentUser]);

  React.useEffect(() => {
    getAllWordPhrases();
  }, [getAllWordPhrases]);

  return (
    <>
      {load && <Loading />}
      {!load && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {data.map((wordphrase: WordphrasesInterface) => (
            <div
              className="p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold">{wordphrase.phrase}</h2>
              <p className="text-sm text-gray-500">
                Points: {wordphrase.points}
              </p>
              <p className="text-sm text-gray-500">
                Created at: {wordphrase.createdOn}
              </p>
              <p className="text-sm text-gray-500">
              createdBy: {wordphrase.createdBy}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center my-4">No wordphrases found</p>
      )}
      <button
        className={`fixed bottom-4 right-4 p-4 rounded-full bg-${buttonTheme}-500 text-white`}
      > 

        <IoMdAdd size={32} />
      </button>
    </>
  );
}
