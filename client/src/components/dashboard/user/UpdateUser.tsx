import React from "react";
import InputName from "../../input/InputName";
import UserErrorInterface from "../../../interface/Error";
import InputEmail from "../../input/InputEmail";
// import InputRole from "../../input/InputRole";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/Context";
import { API_URL } from "../../../constants/data";
import validateUser from "../../../functions/validateUserSignup";
import UserInterface from "../../../interface/NewUser";
import InputSelect from "../../input/InputSelect";
import { Status } from "../../../constants/Status";

export default function UpdateUser(props: UserInterface) {
  const { user: currentUser } = React.useContext(AppContext);
  const params = useParams()

  const getUser = React.useRef(() => {});

  const [uid, setUid] = React.useState("");
  const [userUpdate, setUserUpdate] = React.useState({
    userId: uid,
    email: "",
    name: "",
    username: "",
    role: "user",
    password: "",
    status: "active",
  });
  const [error, setError] = React.useState<UserErrorInterface>({
    message: "",
    hasError: false,
    field: "",
  });

  function handleChanges(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
  }

  async function update() {
    let errors: UserErrorInterface = validateUser(userUpdate, "", false);
    console.log(errors);
    if (errors.hasError) {
      setError(errors);
      return;
    }
    setError({ message: "", hasError: false, field: "" });

    // creating a temp user object
    const tmpuser = {
      ...userUpdate,
      session: currentUser.session,
      access_token: currentUser.access_token,
      uid: currentUser.uid,
    };

    console.log(tmpuser);

    const response = await fetch(`${API_URL}/update-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpuser),
    }).then((res) => res.json());

    alert(response.message);
    if (response.message === "User updated") {
      window.location.href = "/dashboard/users";
    }
  }

  getUser.current = async () => {
    if (props.uid) {
      return;
    }
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
    setUserUpdate(
      (prev) =>
        (prev = {
          ...prev,
          email: data.email,
          name: data.name,
          username: data.username,
          role: data.role,
          userId: data.uid,
          status: data.status,
        })
    );
  };

  React.useEffect(() => {
    setError({ message: "", hasError: false, field: "" });
  }, [userUpdate]);

  React.useEffect(() => {
    getUser.current();
  }, [currentUser]);

  React.useEffect(() => {
    let tmpuser = {
      email: props.email || "",
      name: props.name || "",
      username: props.username || "",
      role: props.role || "",
      userId: props.uid || "",
      status: props.status || "",
      password: "",
    };
    setUserUpdate(tmpuser);
  }, [props]);

  React.useEffect(() => {
    const uid = params.uid || "";
    setUid(uid);
  }, [params]);

  return (
    <>
      <div className=" mt-4 md:mt-7 w-[95%] mx-auto">
        <h1 className="font-black text-3xl text-start text-black my-2">
          {" "}
          Update User
        </h1>

        <div className="w-full md:w-8/12 mx-auto my-8">
          <InputName
            defValue={userUpdate.name}
            onChangeHandler={handleChanges}
            placeholder="Enter Name"
            name="name"
            error={
              error.field === "name" && error.hasError ? error.message : ""
            }
          />
          <InputName
            defValue={userUpdate.username}
            onChangeHandler={handleChanges}
            placeholder="Enter Username"
            name="username"
            error={
              error.field === "username" && error.hasError ? error.message : ""
            }
          />
          <InputEmail
            defValue={userUpdate.email}
            onChangeHandler={handleChanges}
            placeholder="Enter Email"
            name="email"
            error={
              error.field === "email" && error.hasError ? error.message : ""
            }
          />

          {/* <InputRole
            defValue={userUpdate.role}
            onChangeHandler={handleChanges}
            name="role"
            error={
              error.field === "role" && error.hasError ? error.message : ""
            }
          /> */}
             <InputSelect
              defValue=""
              disabled={true}
              name="status"
              selectArray={Status}
            />
          {/* <InputStatus
            defValue={userUpdate.status}
            onChangeHandler={handleChanges}
            name="status"
            error={
              error.field === "status" && error.hasError ? error.message : ""
            }
          /> */}
          <button
            onClick={update}
            className="w-full bg-[#002F53] text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl mt-4 flex justify-center items-center"
          >
            Update User
          </button>
        </div>
      </div>
    </>
  );
}
