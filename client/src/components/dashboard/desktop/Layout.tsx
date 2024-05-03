import React from "react";
import Sidebar from "./Sidebar";
import { AppContext } from "../../../context/Context";

export default function Layout(props: { children: React.ReactNode }) {
  const { theme } = React.useContext(AppContext);

  const mainTheme =
    theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white text-black";

  return (
    <>
      <div className="relative w-full h-[100vh] overflow-hidden">
        <Sidebar />
        <div
          className={
            "w-full overflow-y-scroll lg:w-[80%] lg:absolute lg:top-0 right-0  shadow-xl h-full z-20 rounded-t-3xl lg:rounded-t-[unset] lg:rounded-l-[1.5rem!important] px-4 py-10 " +
            mainTheme
          }
        >
          {props.children}
        </div>
      </div>
    </>
  );
}
