import React from "react";
import InputName from "../../input/InputName";
import InputEmail from "../../input/InputEmail";
// import InputRole from "../../input/InputRole";
import { AppContext } from "../../../context/Context";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../constants/data";
import UpdateUser from "./UpdateUser";
import InputSelect from "../../input/InputSelect";
import { Status } from "../../../constants/Status";

export default function ViewUser() {
  const { user: currentUser } = React.useContext(AppContext);

  const uid = useParams().uid || "";
  const getUser = React.useRef(() => {});

  const [update, setUpdate] = React.useState(false);

  const [userView, setUserView] = React.useState({
    email: "",
    name: "",
    username: "",
    role: "user",
    password: "",
    status: "active",
  });

  getUser.current = async () => {
    if (!currentUser.uid) {
      return;
    }
    const params = new URLSearchParams();
    params.append("uid", currentUser.uid);
    params.append("session", currentUser.session);
    params.append("userId", uid);
    params.append("token", currentUser.access_token);

    const response = await fetch(`${API_URL}/get-user?${params}`);
    const data = await response.json();
    setUserView(data);
  };

  React.useEffect(() => {
    getUser.current();
  }, [currentUser]);

  return (
    <>
      {update ? (
        <UpdateUser {...userView} />
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
                href={"/dashboard/users/delete-users/" + uid}
                className="bg-red-500 text-white mx-2 text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center ml-4"
              >
                Delete User
              </a>
            </div>
          </div>
          <div className="w-full md:w-8/12 mx-auto my-8">
            <InputName
              defValue={userView.name}
              placeholder="Enter Name"
              name="name"
              disabled={true}
            />
            <InputName
              defValue={userView.username}
              disabled={true}
              placeholder="Enter Username"
              name="username"
            />
            <InputEmail
              defValue={userView.email}
              disabled={true}
              placeholder="Enter Email"
              name="email"
            />
            {/* <InputRole defValue="" disabled={true} name="role" /> */}
            <InputSelect
              defValue=""
              disabled={true}
              name="status"
              selectArray={Status}
            />
          </div>
        </div>
      )}
    </>
  );
}
