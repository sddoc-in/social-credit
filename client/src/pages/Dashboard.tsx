import React from "react";
import MostPointsUser from "../components/dashboard/graphs/MostPointsUser";
import MostUsedPhrase from "../components/dashboard/graphs/MostUsedPhrase";
import MostPointsPhrase from "../components/dashboard/graphs/MostPointsPhrase";

export default function Dashboard() {
  return (
    <>
      <h1 className="font-black text-3xl text-start text-black">
        Dashboard 
      </h1>
      <MostPointsUser />
      <div className="flex justify-center items-center flex-col md:flex-row">
        <MostUsedPhrase />
        <MostPointsPhrase />
      </div>
    </>
  );
}
