///@ts-nocheck

import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { AppContext } from "../../../context/Context";
import axios from "axios";
import { API_URL } from "../../../constants/data";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function MostPointsUser() {
  const { user: currentUser } = React.useContext(AppContext);

  const [options, setOptions] = React.useState({});
  const [data, setData] = React.useState([]);

  const getMostPointsUser = React.useRef(() => {});

  getMostPointsUser.current = async () => {
    if (!currentUser.uid) {
      return;
    }

    try {
      const params = new URLSearchParams({
        uid: currentUser.uid,
        session: currentUser.session,
        access_token: currentUser.access_token,
      });

      const data = await axios
        .get(API_URL + "/graphs/discord-users?" + params)
        .then((res) => res.data)
        .catch((err) => {
          let data = err.response.data;
          alert(data.message);
          return;
        });

      setData(data);
      setOptionsForGraph(data);
    } catch (err) {}
  };

  function setOptionsForGraph(data) {
    let options = {
      animationEnabled: true,
      title: {
        text: "Most Points User",
      },
      axisY: {
        title: "Points",
        includeZero: false,
      },
      axisX: {
        title: "User",
        interval: 1,
        reversed: true,
      },
      data: [
        {
          type: "bar",
          //data for 10 users with most points
          dataPoints: data.slice(0, 10).map((user) => {
            return { y: user.total_points, label: user.username };
          }),
        },
      ],
    };

    setOptions(options);
  }

  React.useEffect(() => {
    getMostPointsUser.current();
  }, [currentUser]);

  function downloadCSV() {
    let csv = [];
    csv.push("User Id,Username,Last Message time,Points");
    data.forEach((user) => {
      csv.push(
        `${user.userId},${user.username},${new Date(
          user.last_message_time
        ).toLocaleString()},${user.total_points}`
      );
    });

    const csvData = csv.join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "most-points-user.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <>
      <div className="md:10/12 w-11/12 mx-auto my-4">
        <CanvasJSChart options={options} />
        <div className="my-4 w-fit mx-auto max-h-[800px] overflow-y-auto">
          {data.length > 0 && (
            <>
              <button
                onClick={downloadCSV}
                className="bg-blue-500 hover:bg-blue-700 my-2 text-white font-bold py-2 px-4 rounded"
              >
                Download CSV
              </button>
              <table className="table-auto ">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">User Id</th>
                    <th className="border px-4 py-2">Username</th>
                    <th className="border px-4 py-2">Last Message time</th>
                    <th className="border px-4 py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => (
                    <tr key={user.label}>
                      <td className="border px-4 py-2">{user.userId}</td>
                      <td className="border px-4 py-2">{user.username}</td>
                      <td className="border px-4 py-2">
                        {new Date(user.last_message_time).toLocaleString()}
                      </td>
                      <td className="border px-4 py-2">{user.total_points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
}
