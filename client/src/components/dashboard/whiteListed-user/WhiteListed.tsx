import React from "react";
import { AppContext } from "../../../context/Context";
import getAllWhiteLitedInterface from "../../../interface/getAllWhiteLited";
import { API_URL } from "../../../constants/data";
import axios from "axios";
import Loading from "../../loader/Loading";
import { IoMdAdd } from "react-icons/io";
import WhiteListedCard from "./WhiteListedCard";

export default function WhiteListed() {
  const { user: currentUser, buttonTheme } = React.useContext(AppContext);
  const [data, setData] = React.useState<getAllWhiteLitedInterface[]>([]);
  const [load, setLoad] = React.useState(true);

  const getAllWhiteLited = React.useCallback(async () => {
    if (!currentUser.uid) {
      return;
    }
    try {
      const params = new URLSearchParams({
        uid: currentUser.uid,
        session: currentUser.session,
        access_token: currentUser.access_token,
      });

      const response = await axios.get(`${API_URL}/whiteListed/all?${params}`);
      const responseData = response.data;
      if (responseData.message) {
        alert(responseData.message);
        return;
      }
      setData(responseData);
    } catch (err) {
      alert("Error fetching data");
    } finally {
      setLoad(false);
    }
  }, [currentUser]);

  React.useEffect(() => {
    getAllWhiteLited();
  }, [getAllWhiteLited]);

  return (
    <>
      {load && <Loading />}
      {!load && data.length > 0 ? (
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">WhiteListed Users</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((whiteListed: getAllWhiteLitedInterface) => (
              <WhiteListedCard key={whiteListed.uuid} data={whiteListed} />  
            ))}
          </div>
        </div>
      ) : (
        !load && <p className="text-center my-4">No white-listed users found</p>
      )}
      <button
        className={`fixed bottom-4 right-4 p-4 rounded-full bg-${buttonTheme}-500 text-white`}
      >
        <IoMdAdd size={32} />
      </button>
    </>
  );
}
