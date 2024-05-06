import React from "react";
import MostPointsUser from "../components/dashboard/graphs/MostPointsUser";
import MostUsedPhrase from "../components/dashboard/graphs/MostUsedPhrase";
import MostPointsPhrase from "../components/dashboard/graphs/MostPointsPhrase";
import Loading from "../components/loader/Loading";
export default function Dashboard() {
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
      <h1 className="font-black text-3xl text-start text-black">Dashboard</h1>
      <MostPointsUser />
      <MostUsedPhrase />
      <MostPointsPhrase />
    </>
  );
}
