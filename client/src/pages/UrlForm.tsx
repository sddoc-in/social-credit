import React from "react";
import { useParams } from "react-router-dom";
import InputName from "../components/input/InputName";
import { API_URL } from "../constants/data";

export default function UrlForm() {
  const params = useParams();

  const validateUrl = React.useRef(() => {});

  validateUrl.current = async () => {
    const url = params.url;

    // send a request to the server to validate the url
    const response = await fetch(`${API_URL}/validate-url?url=${url}`);
    const data = await response.json();
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
