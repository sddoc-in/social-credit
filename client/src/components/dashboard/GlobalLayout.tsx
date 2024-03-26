import React from "react";
import MobileSideBar from "./mobile/MobileSideBar";
import Layout from "./desktop/Layout";
import { AppContext } from "../../context/Context";

export default function GlobalLayout(props: { children: React.ReactNode }) {
  const { loggedIn } = React.useContext(AppContext);

  // React.useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     window.location.href = "/";
  //   } else if (!loggedIn) {
  //     window.location.href = "/";
  //   }
  // }, [loggedIn]);
  return (
    <>
      <MobileSideBar>
        <Layout>{props.children}</Layout>
      </MobileSideBar>
    </>
  );
}
