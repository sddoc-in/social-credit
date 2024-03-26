import React from 'react';
import InputName from '../../input/InputName';
import InputEmail from '../../input/InputEmail';
import InputRole from '../../input/InputRole';
import { AppContext } from '../../../context/Context';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../constants/data';
import InputStatus from '../../input/InputStatus';
import UpdateClient from './UpdateClient';

export default function ViewClient() {

    const { client: currentClient } = React.useContext(AppContext);
    const cid = useParams().cid || "";
    const getClient = React.useRef(() => {});

    const [update, setUpdate] = React.useState(false);

    const [clientView, setClientView] = React.useState({
       cid: "",
        email: "",
        name: "",
        username: "",
        lawyer: "",
        password: "",
        status: "active",
    });

    getClient.current = async () => {
        if (!currentClient.cid) {
            return;
        }
        const params = new URLSearchParams();
        params.append("cid", currentClient.cid);
        params.append("session", currentClient.session);
        params.append("clientId", cid);
        params.append("token", currentClient.access_token);

        const response = await fetch(`${API_URL}/get-client?${params}`);
        const data = await response.json();
        setClientView(data);
    };

    React.useEffect(() => {
        getClient.current();
    }, [currentClient]);

    return (
        <>
          {update ? (
            <UpdateClient {...clientView} />
          ) : (
            <div className=" mt-4 md:mt-7 w-[95%] mx-auto">
              <div className="flex justify-between items-center">
                <h1 className="font-black text-3xl text-start text-black my-2">
                  {" "}
                  View User
                </h1>
                <div className="flex justify-center items-center">
                  <p
                    // href={"/dashboard/users/update-users/" + uid}
                    onClick={() => setUpdate(true)}
                    className="bg-[#002F53] text-white mx-2 text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center"
                  >
                    Update User
                  </p>
                  <a
                    href={"/dashboard/users/delete-users/" + cid}
                    className="bg-red-500 text-white mx-2 text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center ml-4"
                  >
                    Delete User
                  </a>
                </div>
              </div>
              <div className="w-full md:w-8/12 mx-auto my-8">
                <InputName
                  defValue={clientView.name}
                  placeholder="Enter Name"
                  name="name"
                  disabled={true}
                />
                <InputName
                  defValue={clientView.username}
                  disabled={true}
                  placeholder="Enter Username"
                  name="username"
                />
                <InputEmail
                  defValue={clientView.email}
                  disabled={true}
                  placeholder="Enter Email"
                  name="email"
                />
                <InputRole defValue="" disabled={true} name="role" />
                <InputStatus defValue="" disabled={true} name="status" />
              </div>
            </div>
          )}
        </>
      );  

}