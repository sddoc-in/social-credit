import React from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants/data";
import InputName from "../components/input/InputName";
import Loading from "../components/loader/Loading";

export default function UrlForm() {
  const params = useParams();

  const [load, setLoad ] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);

  

  const validateUrl = React.useRef(() => {});

  validateUrl.current = async () => {
    const url = params.url;

    // send a request to the server to validate the url
    setLoad(true)
    const response = await fetch(`${API_URL}/validate-url?url=${url}`);
    const data = await response.json();
    setLoad(false)
    console.log(data);
    // if (data.message !== "Valid url") {
    //     window.location.href = "/wrong-url";
    // }
  };

  React.useEffect(() => {
    validateUrl.current();
  }, []);
  return (
    <>
    {load && <Loading />}
      <div className="w-full h-screen bg-white flex justify-center items-center">
        <div className=" w-11/12 md:w-1/2 mx-auto h-auto">
          <InputName
            name="name"
            label="First Name"
            defValue=""
            placeholder="First Name"
          />

          <InputName
            name="name"
            label="Second Name"
            defValue=""
            placeholder="Second name"
          />
        </div>
      </div>
    </>
  );
}
