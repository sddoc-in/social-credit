import React from "react";
import Loading from "../components/loader/Loading";
export default function WrongUrl() {

  const [load, setLoad ] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {load && <Loading />}
      <div className="flex justify-center items-center w-full h-screen">
        <div className="w-[400px] bg-white p-4 rounded-md shadow-2xl">
          <h1 className="text-2xl font-bold text-center text-black">
            Wrong Url
          </h1>
          <p className="text-center text-black font-extrabold my-4">
            The url you are trying to access is invalid
          </p>
        </div>
      </div>
    </>
  );
}
