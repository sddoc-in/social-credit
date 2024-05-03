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
    role: "",
    status: "",
  });
  const [userNew, setUserNew] = React.useState<UserInterface>({
    email: "",
    name: "",
    username: "",
    role: "user",
    password: "",
  });

  const [client, setClient] = React.useState({
    username: "",
    session: "",
    access_token: "",
    cid: "",
  });

  const [theme, setTheme] = React.useState<string>(localStorage.getItem("theme") || "light");

  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  const [dialog, setDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    setRouterPath(window.location.pathname.split("/").pop() || "/");
  }, []);

  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }

  let socialTheme = theme === "light" ? "text-white" : "text-[#FFC107]";
  let creditTheme = theme === "light" ? "text-[#FFC107]" : "text-red-500";
  const sidebarTheme = theme === "light" ? "bg-[#002F53]" : "bg-gray-900";
  const textTheme = theme === "light" ? "text-[#002F53]" : "text-gray-900";
  const headingTheme = theme === "light" ? "text-[#002F53]" : "text-red-500";
  const buttonTheme = theme === "light" ? "bg-[#002F53]" : "bg-[#FFC107]";

  function fetchUserCookies() {
    const cookies = document.cookie.split(";");
    const user: any = {};
    cookies.forEach((cookie) => {
      const [key, value] = cookie.split("=");
      user[key.trim()] = value;
    });
    const tmpuser = {
      username: user["user-name"],
      session: user["session"],
      access_token: user["access_token"],
      uid: user["uid"],
      role: user["role"],
      status: user["status"],
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
    document.cookie = "session=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "access_token=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "uid=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "role=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "status=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = user.session;
    const token = user.access_token;
    document.cookie = `user-name=${user.name}; Expires=${expires}`;
    document.cookie = `session=${session}; Expires=${expires}`;
    document.cookie = `access_token=${token}; Expires=${expires}`;
    document.cookie = `uid=${user.uid}; Expires=${expires}`;
    document.cookie = `role=${user.role}; Expires=${expires}`;
    document.cookie = `status=${user.status}; Expires=${expires}`;

    setUser(user);
  }

  React.useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
    fetchUserCookies();
  }, []);

  return (
    <AppContext.Provider
      value={{
        routerPath,
        setRouterPath,
        dialog,
        setDialog,
        setCookies,
        fetchUserCookies,
        user,
        client,
        setClient,
        loggedIn,
        setUser,
        userNew,
        setUserNew,
        theme,
        setTheme,
        changeTheme,
        socialTheme,
        creditTheme,
        sidebarTheme,
        textTheme,
        headingTheme,
        buttonTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
