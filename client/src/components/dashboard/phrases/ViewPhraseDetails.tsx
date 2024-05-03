import React from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/Context";
import { API_URL } from "../../../constants/data";
import axios from "axios";
import FlexContent from "../../reusable/FlexContent";
import DetailsContent from "./DetailsContent";

export default function ViewPhraseDetails() {
  const { phrase_id } = useParams();
  const [data, setData] = React.useState<any>({});
  const { user: currentUser,headingTheme } = React.useContext(AppContext);

  const getPhraseDetails = React.useRef(() => {});

  getPhraseDetails.current = async function () {
    if (!currentUser.uid) {
      return;
    }
    if (!phrase_id) {
      return;
    }
    const params = new URLSearchParams({
      uid: currentUser.uid,
      session: currentUser.session,
      access_token: currentUser.access_token,
      phrase_id: phrase_id,
    });

    const data = await axios
      .get(API_URL + "/phrases/?" + params)
      .then((res) => res.data);
    if (data.message) {
      alert(data.message);
      return;
    }
    setData(data);
  };

  React.useEffect(() => {
    getPhraseDetails.current();
  }, [currentUser, phrase_id]);

  return (
    <>
 <h1 className={"font-black text-3xl text-start " + headingTheme}>Phrases</h1>
      <div className="my-4"></div>
      <FlexContent label="Phrase" value={data.phrase} />
      <FlexContent label="Points" value={data.points} />
      <FlexContent label="Gained Points" value={data.total_gained_points} />
      {data.last_used && (
        <FlexContent
          label="Last Used"
          value={new Date(data.last_used).toLocaleString()}
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
