import React from "react";
import { AppContext } from "../context/Context";

export default function Logout() {
  const { setUser } = React.useContext(AppContext);
  function logout() {
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
  logout();

  return <div></div>;
}
