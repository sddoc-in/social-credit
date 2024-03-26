import React from "react";
import InputName from "../../input/InputName";
import UserErrorInterface, { ClientErrorInterface } from "../../../interface/Error";
import InputEmail from "../../input/InputEmail";
import InputRole from "../../input/InputRole";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/Context";
import { API_URL } from "../../../constants/data";
import InputStatus from "../../input/InputStatus";
import validateClient from "../../../functions/validateClient";
import ClientInterface from "../../../interface/NewClient";

export default function UpdateClient(props: ClientInterface) {
    const{client: currentClient} = React.useContext(AppContext);
    const params = useParams();

    const getClient = React.useRef(() => {});

    const [cid, setCid] = React.useState("");
    const [clientUpdate, setClientUpdate] = React.useState({
        cid: cid,
        email:"",
        name: "",
        username:"",
        lawyer:"",
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
        setClientUpdate({ ...clientUpdate, [e.target.name]: e.target.value });
    }

    async function update() {
        let errors: ClientErrorInterface = validateClient(clientUpdate, "", false);
        console.log(errors);
        if (errors.hasError) {
            setError(errors);
            return;
        }
        setError({ message: "", hasError: false, field: "" });

        //creating a temp user object

        const tmpclient = {
            ...clientUpdate,
            session: currentClient.session,
            access_token: currentClient.access_token,
            cid: currentClient.cid,
        };

        console.log(tmpclient);

        const response = await fetch(`${API_URL}/update-client`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tmpclient),
        }).then((res) => res.json());
         
        alert(response.message);
        if(response.message === "Client updated successfully"){
            window.location.href = "/dashboard/clients";
        }
        }

        getClient.current = async () => {
            if (props.cid) {
                return;
            }
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
            setClientUpdate(
                (prev)=>({
                    ...prev,
                    email: data.email,
                    name: data.name,
                    username: data.username,
                    lawyer: data.lawyer,
                    clientid: data.cid,
                    password: data.password,
                    status: data.status,
                })
            )
        };
        React.useEffect(() => {
            setError({ message: "", hasError: false, field: "" });
        }, [clientUpdate]);
        
        React.useEffect(() => {
            getClient.current();
        }, [currentClient]);
        
        React.useEffect(() => {
            let tempclient = {
                email: props.email || "",
                name: props.name || "",
                username: props.username || "",
                lawyer: props.lawyer || "",
                password: props.password || "",
                status: props.status || "active",
                cid: props.cid || "",
            };
        setClientUpdate(tempclient);
        },[props]);

        React.useEffect(() => {
            const cid = params.cid || "";
            setCid(cid);
        }, [params]);

        return (
            <>
              <div className=" mt-4 md:mt-7 w-[95%] mx-auto">
                <h1 className="font-black text-3xl text-start text-black my-2">
                  {" "}
                  Update Client
                </h1>
        
                <div className="w-full md:w-8/12 mx-auto my-8">
                  <InputName
                    defValue={clientUpdate.name}
                    onChangeHandler={handleChanges}
                    placeholder="Enter Name"
                    name="name"
                    error={
                      error.field === "name" && error.hasError ? error.message : ""
                    }
                  />
                  <InputName
                    defValue={clientUpdate.username}
                    onChangeHandler={handleChanges}
                    placeholder="Enter Username"
                    name="username"
                    error={
                      error.field === "username" && error.hasError ? error.message : ""
                    }
                  />
                  <InputEmail
                    defValue={clientUpdate.email}
                    onChangeHandler={handleChanges}
                    placeholder="Enter Email"
                    name="email"
                    error={
                      error.field === "email" && error.hasError ? error.message : ""
                    }
                  />
        
                  <InputRole
                    defValue={clientUpdate.lawyer}
                    onChangeHandler={handleChanges}
                    name="role"
                    error={
                      error.field === "role" && error.hasError ? error.message : ""
                    }
                  />
                  <InputStatus
                    defValue={clientUpdate.status}
                    onChangeHandler={handleChanges}
                    name="status"
                    error={
                      error.field === "status" && error.hasError ? error.message : ""
                    }
                  />
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