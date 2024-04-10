///@ts-nocheck

import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { AppContext } from "../../../context/Context";
import axios from "axios";
import { API_URL } from "../../../constants/data";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function MostUsedPhrase() {
  const { user: currentUser } = React.useContext(AppContext);

  const [options, setOptions] = React.useState({});

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
        .get(API_URL + "/graphs/phrase?" + params)
        .then((res) => res.data)
        .catch((err) => {
          let data = err.response.data;
          alert(data.message);
          return;
        });

      setOptionsForGraph(data);
    } catch (err) {}
  };

  function setOptionsForGraph(data) {
    let options = {
      animationEnabled: true,
      title: {
        text: "Most used Phrase",
      },
      axisY: {
        title: "Count",
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
          dataPoints: data.map((user) => {
            return {
              label: user.phrase,
              y: user.used_count,
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

  return (
    <>
      <div className="md:10/12 w-11/12 mx-auto my-4">
        <CanvasJSChart options={options} />
      </div>
    </>
  );
}
