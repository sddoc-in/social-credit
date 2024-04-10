import React from "react";
import InputName from "../../input/InputName";
import UserErrorInterface from "../../../interface/Error";
import validateUser from "../../../functions/validateUserSignup";
import InputEmail from "../../input/InputEmail";
import InputPass from "../../input/InputPass";
// import InputRole from "../../input/InputRole";
import { AppContext } from "../../../context/Context";
import { API_URL } from "../../../constants/data";
// import { useRegisterUser } from "../../../api/User";

export default function NewUser() {
  const { user: currentUser } = React.useContext(AppContext);

  const [userNew, setUserNew] = React.useState({
    email: "",
    name: "",
    username: "",
    role: "user",
    password: "",
  });
  const [cPassword, setCPassword] = React.useState("");

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
    if (e.target.name === "confirmPassword") {
      setCPassword(e.target.value);
      return;
    }
    setUserNew({ ...userNew, [e.target.name]: e.target.value });
  }

  async function register() {
    let errors: UserErrorInterface = validateUser(userNew, cPassword);
    if (errors.hasError) {
      setError(errors);
      return;
    }
    const tmpuser = {
      ...userNew,
      session: currentUser.session,
      access_token: currentUser.access_token,
      uid: currentUser.uid,
    };
    console.log(tmpuser);
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpuser),
    });
    const data = await response.json();
    alert(data.message);
    window.location.href = "/dashboard/users";
  }

  React.useEffect(() => {
    setError({ message: "", hasError: false, field: "" });
  }, [userNew]);

  return (
    <>
      <div className=" mt-4 md:mt-7 w-[95%] mx-auto">
        <h1 className="font-black text-3xl text-start text-black my-2">
          {" "}
          Create User
        </h1>

        <div className="w-full md:w-8/12 mx-auto my-8">
          <InputName
            defValue=""
            onChangeHandler={handleChanges}
            placeholder="Enter Name"
            name="name"
            error={
              error.field === "name" && error.hasError ? error.message : ""
            }
          />
          <InputName
            defValue=""
            onChangeHandler={handleChanges}
            placeholder="Enter Username"
            name="username"
            error={
              error.field === "username" && error.hasError ? error.message : ""
            }
          />
          <InputEmail
            defValue=""
            onChangeHandler={handleChanges}
            placeholder="Enter Email"
            name="email"
            error={
              error.field === "email" && error.hasError ? error.message : ""
            }
          />
          <InputPass
            defValue=""
            onChangeHandler={handleChanges}
            name="password"
            error={
              error.field === "password" && error.hasError ? error.message : ""
            }
          />

          <InputPass
            defValue=""
            onChangeHandler={handleChanges}
            name="confirmPassword"
            error={
              error.field === "confirmPassword" && error.hasError
                ? error.message
                : ""
            }
          />
          {/* <InputRole
            defValue=""
            onChangeHandler={handleChanges}
            name="role"
            error={
              error.field === "role" && error.hasError ? error.message : ""
            }
          /> */}
          <button
            onClick={register}
            className="w-full bg-[#002F53] text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl mt-4 flex justify-center items-center"
          >
            Create User
          </button>
        </div>
      </div>
    </>
  );
}
