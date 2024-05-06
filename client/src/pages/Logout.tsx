import React from "react";
import Loading from "../components/loader/Loading";
import { AppContext } from "../context/Context";

export default function Logout() {
  const { setUser } = React.useContext(AppContext);
  const [load, setLoad ] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);
  function logout() {
    setLoad(true);
    localStorage.removeItem("user");
    setUser({
      username: "",
      session: "",
      access_token: "",
      uid: "",
      role: "",
      status: "",
    });

    document.cookie = "user-name=;Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "session=;Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "access_token=;Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "uid=;Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "role=;Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "status=;Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = "/sign-in";
  }
  logout()
  setLoad(false);

  return <div></div>;
}
