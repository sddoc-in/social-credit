import React from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/Context";
import { API_URL } from "../../../constants/data";
import axios from "axios";
import FlexContent from "../../reusable/FlexContent";
import DetailsContent from "./DetailsContent";

export default function UserDetails() {
  const { userId } = useParams();
  const [data, setData] = React.useState<any>({});
  const { user: currentUser, headingTheme } = React.useContext(AppContext);

  const getPhraseDetails = React.useRef(() => {});

  getPhraseDetails.current = async function () {
    if (!currentUser.uid) {
      return;
    }
    if (!userId) {
      return;
    }

    const params = new URLSearchParams({
      uid: currentUser.uid,
      session: currentUser.session,
      access_token: currentUser.access_token,
      userId: userId,
    });

    const data = await axios
      .get(API_URL + "/discord/user?" + params)
      .then((res) => res.data);
    if (data.message) {
      alert(data.message);
      return;
    }
    setData(data);
  };

  React.useEffect(() => {
    getPhraseDetails.current();
  }, [currentUser, userId]);

  return (
    <>
      <h1 className={"font-black text-3xl text-start " + headingTheme}>
        Discord User
      </h1>
      <div className="my-4"></div>
      <FlexContent label="UserName" value={data.username} />
      <FlexContent label="Points" value={data.total_points} />
      {data.last_message_time && (
        <FlexContent
          label="Last Points Gained"
          value={new Date(data.last_message_time).toLocaleString()}
        />
      )}
      {data.data && data.data.length > 0 ? (
        <>
          <div className="my-4"></div>
          <h1 className={"font-black text-3xl text-center " + headingTheme}>
            Details
          </h1>
          <div className="my-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.data.map((item: any, index: number) => (
              <DetailsContent key={index} {...item} />
            ))}
          </div>
        </>
      ) : (
        <p className=" text-xl text-start text-black my-4">Not Used Yet</p>
      )}
    </>
  );
}
