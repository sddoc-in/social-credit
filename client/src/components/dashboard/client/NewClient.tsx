import React from "react";
import InputName from "../../input/InputName";
import UserErrorInterface from "../../../interface/Error";
import InputEmail from "../../input/InputEmail";
import InputSelect from "../../input/InputSelect";
import { AppContext } from "../../../context/Context";
import { API_URL } from "../../../constants/data";
import InputPass from "../../input/InputPass";


export default function NewClient() {

  const { client: currentClient } = React.useContext(AppContext);

  const [clientNew, setClientNew] = React.useState({
    email: "",
    name: "",
    username: "",
    role: "client",
    password: "",
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
    setClientNew({ ...clientNew, [e.target.name]: e.target.value });
  }


  async function createClient() {
    if (error.hasError) {
      setError(error);
      return;
    }
    // create encoded url 
    // const clientId = currentClient.cid;
    // const url = `${API_URL}/html/`;
    // const encodedUrl = encodeURIComponent(url);
    // console.log(encodedUrl);


    const tmpclient = {
      ...clientNew,
      session: currentClient.session,
      access_token: currentClient.access_token,
      cid: currentClient.cid,
    };
    console.log(tmpclient);
    const response = await fetch(`${API_URL}/create-client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpclient),
    });
    const data = await response.json();
    console.log(data);
    window.location.href = "/dashnoard/clients";
  }

  React.useEffect(() => {
    setError({ message: "", hasError: false, field: "" });
  }, []);

  return (
    <>
      <div className=" mt-4 md:mt-7 w-[95%] mx-auto">
        <h1 className="font-black text-3xl text-start text-black my-2">
          {" "}
          Create Client
        </h1>
        <div className="w-full md:w-8/12 mx-auto my-8">
          <div className="flex justify-between">
            <InputName
              defValue=""
              onChangeHandler={handleChanges}
              placeholder="First Name"
              inputClassName="w-[49%]"
              name="name"
              error={
                error.field === "name" && error.hasError ? error.message : ""
              }
            />
            <InputName
              defValue=""
              onChangeHandler={handleChanges}
              placeholder="Last Name"
              inputClassName="w-[49%]"
              name="lastname"
              error={
                error.field === "lastname" && error.hasError
                  ? error.message
                  : ""
              }
            />
          </div>
          <InputName
            defValue=""
            onChangeHandler={handleChanges}
            placeholder="Enter Username"
            name="username"
            error={
              error.field === "username" && error.hasError
                ? error.message
                : ""
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
          <InputSelect
            defValue=""
            onChangeHandler={handleChanges}
            placeholder="Select Lawer"
            name="lawer"
            error={
              error.field === "lawyer" && error.hasError ? error.message : ""
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
          <button
            onClick={createClient}
            className="w-full bg-[#002F53] text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl mt-4 flex justify-center items-center"
          >
            Create Client
          </button>
        </div>
      </div>
    </>
  );
}