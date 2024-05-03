import React from "react";
import MostPointsUser from "../components/dashboard/graphs/MostPointsUser";
import MostUsedPhrase from "../components/dashboard/graphs/MostUsedPhrase";
import MostPointsPhrase from "../components/dashboard/graphs/MostPointsPhrase";
import { AppContext } from "../context/Context";

export default function Dashboard() {
  const { headingTheme } = React.useContext(AppContext);
  return (
    <>
    <h1 className={"font-black text-3xl text-start "+headingTheme}>Dashboard</h1>
      <MostPointsUser />
      <MostUsedPhrase />
      <MostPointsPhrase />
    </>
  );
}
