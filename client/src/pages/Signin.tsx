import React from "react";
import SkyBidder from "../components/common/SkyBidder";
// import SigninFacebook from "../components/user/SigninFacebook";
// import SigninGoogle from "../components/user/SigninGoogle";
import { IoIosSend } from "react-icons/io";
import { AppContext } from "../context/Context";
import { API_URL } from "../constants/data";
import InputName from "../components/input/InputName";
import InputPass from "../components/input/InputPass";
import Loading from "../components/loader/Loading";

export default function Signin() {
  const { setCookies,loggedIn } = React.useContext(AppContext);
  const [load, setLoad ] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);


  React.useEffect(() => {
    if(localStorage.getItem("user")){
      window.location.href = "/dashboard";
    } else if(loggedIn){
      window.location.href = "/dashboard";
    }
  }, [loggedIn]);

  const [user, setUser] = React.useState({
    password: "",
    user: "",
  });

  function handleChanges(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function login() {
    const data = await fetch(API_URL + "/login?" + new URLSearchParams(user),{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },    })
      .then((res) => res.json());

    if (data.message === "User logged in successfully") {
      setCookies(data.user);
      window.location.href = "/dashboard";
    }
    else{
      alert(data.message);
      return;
    }
  }

  return (
    <>
    {load && <Loading />}
    <div className="relative w-full h-auto md:h-[100vh] overflow-hidden">
      <SkyBidder />
      <div className="w-full md:w-[65%] lg:w-[75%] pb-6 md:absolute top-[30%] md:top-0 right-0 bg-white h-full z-20 rounded-t-3xl lg:rounded-t-[unset] lg:rounded-l-[1.5rem!important] block pt-20 md:pt-0 md:flex items-center justify-center">
        <div className="w-[80%] mx-auto">
          <h1 className="text-black font-bold text-[32px]">
            Log in to your account
          </h1>
          <div className="w-full md:w-10/12 mx-auto text-start my-6">
            <InputName
              defValue=""
              onChangeHandler={handleChanges}
              placeholder="Enter Username or Email"
              name="user"
            />
            <InputPass
              defValue=""
              onChangeHandler={handleChanges}
              name="password"
            />
            <button
              onClick={login}
              className="w-full bg-[#002F53] text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl mt-4 flex justify-center items-center"
            >
              <IoIosSend className="mr-3 text-[20px]" /> Log in
            </button>
            <p className="text-[#878787] text-[16px] font-[700] mt-4">
              Forgot your password?{" "}
              <span className="text-[#002F53] font-[900]">Reset Password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
