///@ts-nocheck

import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { AppContext } from "../../../context/Context";
import axios from "axios";
import { API_URL } from "../../../constants/data";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function MostPointsPhrase() {
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
        .get(API_URL + "/graphs/phrase-points?" + params)
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
        text: "Most Points Phrase",
      },
      axisY: {
        title: "Points",
        includeZero: false,
      },
      axisX: {
        title: "Phrase",
        interval: 1,
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}",
          dataPoints: data.slice(0, 10).map((user) => {
            return {
              label: user.phrase,
              y: user.total_gained_points,
            };
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
                    <th className="border px-4 py-2">Phrase</th>
                    <th className="border px-4 py-2">Last Used</th>
                    <th className="border px-4 py-2">Used counts</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => (
                    <tr key={user.label}>
                      <td className="border px-4 py-2">{user.phrase}</td>
                      <td className="border px-4 py-2">
                        {user.last_used
                          ? new Date(user.last_used).toLocaleString()
                          : "Never Used"}
                      </td>
                      <td className="border px-4 py-2">{user.used_count}</td>
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
