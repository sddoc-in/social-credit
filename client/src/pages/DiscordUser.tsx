import React, { useState } from "react";
import Card from "../components/dashboard/discord-user/Card";
import { AppContext } from "../context/Context";
import { API_URL } from "../constants/data";
import InputSearch from "../components/input/InputSearch";
import DiscordUser from "../interface/DiscordUser";
import axios from "axios";
import PannelUser from "../interface/Paneluser";
import Loading from "../components/loader/Loading";

export default function DiscordUserComponent() {
  const { user: currentUser } = React.useContext(AppContext);
  const [data, setData] = React.useState<DiscordUser[]>([]);
  const [data2, setData2] = React.useState<PannelUser[]>([]);
  const [query, setQuery] = useState<string>("");

  const [load, setLoad ] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);

  const getAllUsers = React.useRef(() => {});

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

      let data = await axios
        .get(API_URL + "/discord/users/all?" + params)
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

      setLoad(true);
      data = await axios
        .get(API_URL + "/panel-user/all?" + params)
        .then((res) => res.data)
        .catch((err) => {
          alert(err.response.data.message);
          return;
        });
        setLoad(false);
      const users = data.filter((user: PannelUser) => user.uid !== currentUser.uid);
      setData2(users);
    } catch (err) {}
  };

  React.useEffect(() => {
    getAllUsers.current();
  }, [currentUser]);

  return (
    <>
    {load && <Loading />}
      <h1 className="font-black text-3xl text-start text-black ">
        Discord User
      </h1>
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
            .filter((user: DiscordUser) =>
              user.username.toLowerCase().includes(query.toLowerCase())
            )
            .map((user) => (
              <Card key={user.userId} data={user} panelUser={data2} />
            ))}
        </div>
      ) : (
        <p className="text-center my-4">No user found</p>
      )}
    </>
  );
}
