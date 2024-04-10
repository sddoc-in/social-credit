import React from "react";
import Details from "./Details";
import { AppContext } from "../../../context/Context";
import { API_URL } from "../../../constants/data";
import axios from "axios";

interface Notification {
  _id: string;
  type: string;
  message: string;
  read: boolean;
  approved: boolean;
  approver: string;
  uid: string;
  cancel: boolean;
  user: {
    name: string;
  };
  data: {
    phrase: string;
    points: number;
  };
}

export default function Card(notification: Notification) {
  const { user: currentUser } = React.useContext(AppContext);
  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  async function sentStatus(status: string) {
    const params = new URLSearchParams({
      uid: currentUser.uid,
      session: currentUser.session,
      access_token: currentUser.access_token,
    });

    try {
      const data = await axios
        .post(API_URL + `/notifications/update?` + params, {
          notificationId: notification._id,
          status: status,
          type: notification.type,
        })
        .then((res) => res.data)
        .catch((err) => {
          alert(err.response.data.message);
        });

      if (data.message !== "Notification updated") {
        alert(data.message);
        return;
      }
      alert(data.message);
      window.location.reload();
    } catch (error) {}
  }

  return (
    <>
      <div className="flex flex-col bg-[#002F53] rounded-md p-4 my-2 text-white">
        <p className="text-lg">
          {notification.type
            .split("-")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          - {notification.message}
        </p>
        <p className="text-lg">
          {notification.approver === currentUser.uid ? "By" : "Approver"}:{" "}
          {notification.user.name}
        </p>
        <p className="text-lg">
          Status:{" "}
          {notification.approved
            ? "Approved"
            : notification.cancel
            ? "Rejected"
            : notification.read
            ? "Read"
            : "Pending"}
        </p>
        <div className="flex justify-center items-center my-2">
          {currentUser.uid !== notification.uid &&
            !notification.approved &&
            !notification.cancel && (
              <>
                <button
                  onClick={() => sentStatus("cancel")}
                  className="bg-white mx-3 text-[#002F53] px-3 py-2 rounded-md font-bold"
                >
                  Reject
                </button>
                <button
                  onClick={() => sentStatus("approve")}
                  className="bg-white mx-3 text-[#002F53] px-3 py-2 rounded-md font-bold"
                >
                  Approve
                </button>
                {!notification.read && (
                  <button
                    onClick={() => sentStatus("read")}
                    className="bg-white mx-3 text-[#002F53] px-3 py-2 rounded-md font-bold"
                  >
                    Read
                  </button>
                )}
              </>
            )}
          <button
            onClick={handleOpen}
            className="bg-white mx-3 text-[#002F53] px-3 py-2 rounded-md font-bold"
          >
            Details
          </button>
        </div>
      </div>
      <Details
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={notification.data}
        type={notification.type}
      />
    </>
  );
}
