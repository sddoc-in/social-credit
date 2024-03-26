import React from "react";
import UserInterface from "../interface/NewUser";

export const AppContext = React.createContext<any>({});

export const AppProvider = ({ children }: any) => {
  const [routerPath, setRouterPath] = React.useState<string>("/");

  const [user, setUser] = React.useState({
    username: "",
    session: "",
    access_token: "",
    uid: "",
  });
  const [userNew, setUserNew] = React.useState<UserInterface>({
    email: "",
    name: "",
    username: "",
    role: "user",
    password: "",
  });

  const [client,setClient] = React.useState({
    username: "",
    session: "",
    access_token: "",
    cid: "",
  });

  const [clientNew, setClientNew] = React.useState<UserInterface>({
    email: "",
    name: "",
    username: "",
    role: "client",
    password: "",
  });
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  const [dialog, setDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    setRouterPath(window.location.pathname.split("/").pop() || "/");
  }, []);

  function fetchUserCookies() {
    const cookies = document.cookie.split(";");
    const user: any = {};
    cookies.forEach((cookie) => {
      const [key, value] = cookie.split("=");
      user[key.trim()] = value;
    });
    const tmpuser = {
     username: user["user-name"],
      session: user["session-id"],
      access_token: user["access_token"],
      uid: user["_uid"],
    };
    if (
      tmpuser.username &&
      tmpuser.session &&
      tmpuser.access_token &&
      tmpuser.uid &&
      tmpuser.username !== "undefined" &&
      tmpuser.session !== "undefined" &&
      tmpuser.access_token !== "undefined" &&
      tmpuser.uid !== "undefined"      
    ) {
      localStorage.setItem("user", JSON.stringify(tmpuser));
      setUser(tmpuser);
      setLoggedIn(true);
    }
  }

  function setCookies(user: any) {
    // remove previous cookies
    document.cookie = "user-name=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "session-id=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "access_token=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "_uid=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = user.session;
    const token = user.access_token;
    document.cookie = `user-name=${user.name}; Expires=${expires}`;
    document.cookie = `session-id=${session}; Expires=${expires}`;
    document.cookie = `access_token=${token}; Expires=${expires}`;
    document.cookie = `_uid=${user.uid}; Expires=${expires}`;
  }

  React.useEffect(() => {
    fetchUserCookies();
  }, []);

  return (
    <AppContext.Provider
      value={{ routerPath, setRouterPath, dialog, setDialog, setCookies, fetchUserCookies, user,client,setClient,  loggedIn, setUser, userNew, setUserNew}}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
