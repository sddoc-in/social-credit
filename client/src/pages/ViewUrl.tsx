import React from "react";
import { IoMdAdd } from "react-icons/io";
import { AppContext } from "../context/Context";
import { API_URL } from "../constants/data";
import { FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "../components/loader/Loading";

export default function ViewURL() {
  const { user: currentUser } = React.useContext(AppContext);

  const [load, setLoad ] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);


  const [urls, setUrls] = React.useState<any>([]);

  const getUser = React.useRef(() => {});

  getUser.current = async () => {
    if (!currentUser.uid) {
      return;
    }
    const params = new URLSearchParams();
    params.append("uid", currentUser.uid);
    params.append("session", currentUser.session);
    params.append("token", currentUser.access_token);

    const response = await fetch(`${API_URL}/get-all-urls?${params}`);
    const data = await response.json();
    setUrls(data.urls);
  };

  async function generateUrl() {
    if (!currentUser.uid) {
      return;
    }
    const params = new URLSearchParams();
    params.append("uid", currentUser.uid);
    params.append("session", currentUser.session);
    params.append("token", currentUser.access_token);
    
    setLoad(true)
    const response = await fetch(`${API_URL}/generate-url?${params}`);
    const data = await response.json();
    if (data.url) {
      setUrls([...urls, data.url]);
      alert("Url generated");
    }
  }
  setLoad(false)

  async function deleteUrl(url: string) {
    if (!currentUser.uid) {
      return;
    }
    const params = new URLSearchParams();
    params.append("uid", currentUser.uid);
    params.append("session", currentUser.session);
    params.append("token", currentUser.access_token);
    params.append("url", url);

    setLoad(true)
    const response = await fetch(`${API_URL}/delete-url?${params}`);
    const data = await response.json();
    if (data.message) {
      alert(data.message);
      setUrls(urls.filter((u: any) => u.url !== url));
    }
  }
  setLoad(false)
  
  function onCopyClick(url: string) {
    navigator.clipboard.writeText("http://localhost:3000/url/" + url);
  }

  React.useEffect(() => {
    getUser.current();
  }, [currentUser]);

  return (
    <>
    {load && <Loading />}
      <div className=" mt-4 md:mt-7 w-[95%] mx-auto">
        <div>
          <h1 className="font-black text-3xl text-start text-black my-2">
            {" "}
            All Urls
          </h1>
          <button
            onClick={generateUrl}
            className="bg-[#002F53] text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center"
          >
            <IoMdAdd className="mr-3 text-[20px]" />
            Create Url
          </button>
        </div>

        {/* create html table with table tags with 4 headers url status and options  */}
        <table className="table-auto w-full mt-10 text-start">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-black font-extrabold text-start">URL</th>
              <th className="px-4 py-2 border text-black font-extrabold text-start">Status</th>
              <th className="px-4 py-2 border text-black font-extrabold text-start">Options</th>
            </tr>
          </thead>
          <tbody>
            {urls.length > 0 ? (
              urls.map((url: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-black font-medium">
                      {"http://locahost:3000/url/" + url.url}
                    </td>
                    <td className="border px-4 py-2 text-black font-medium">{url.status}</td>
                    <td className="border px-4 py-2 flex justify-center items-center">
                      <FaCopy
                        onClick={() => onCopyClick(url.url)}
                        className="text-[20px] text-[#002F53] cursor-pointer"
                      />
                      <MdDelete onClick={()=>deleteUrl(url.url)} className="text-red-600 text-[25px] ml-3 cursor-pointer" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="border px-4 py-2" colSpan={3}>
                  No Urls
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* <div className="flex flex-col md:flex-row mt-10">
          
          {urls.length > 0 ? (
            urls.map((url: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center"
                >
                  <p className="text-black text-[16px] font-[600] leading-[20px] py-4">
                    {"http://locahost:3000/url/" + url.url}
                  </p>

                  <p className="text-black text-[16px] font-[600] leading-[20px] py-4">
                    {url.status}
                  </p>

                  <button className="bg-[#002F53] text-white text-[16px] font-[600] leading-[20px] py-4 rounded-xl flex justify-center px-3 items-center">
                    <FaCopy className="mr-3 text-[20px]" />
                  </button>
                </div>
              );
            })
          ) : (
            <p>No Urls</p>
          )}
        </div> */}
      </div>
    </>
  );
}
