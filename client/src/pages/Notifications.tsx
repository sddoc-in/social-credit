import React from "react";
import { AppContext } from "../context/Context";
import axios from "axios";
import { API_URL } from "../constants/data";
import Card from "../components/dashboard/notifications/Card";

export default function Notifications() {
  const { user: currentUser,headingTheme } = React.useContext(AppContext);

  const [approverNotifications, setApproverNotifications] = React.useState([]);
  const [readApproverNotifications, setReadApproverNotifications] =
    React.useState([]);
  const [userNotifications, setUserNotifications] = React.useState([]);
  const [readUserNotifications, setReadUserNotifications] = React.useState([]);

  const getApproverNotifications = React.useRef(() => {});

  getApproverNotifications.current = async () => {
    if (!currentUser.uid) return;
    const approverParams = new URLSearchParams({
      approver: currentUser.uid,
      session: currentUser.session,
      access_token: currentUser.access_token,
    });

    const params = new URLSearchParams({
      uid: currentUser.uid,
      session: currentUser.session,
      access_token: currentUser.access_token,
    });

    try {
      const data = await axios
        .get(API_URL + `/notifications/user?` + params)
        .then((res) => res.data)
        .catch((err) => {
          alert(err.response.data.message);
        });

      const readData = data.filter((notification: any) => notification.read);
      setReadUserNotifications(readData);

      const unreadData = data.filter((notification: any) => !notification.read);
      setUserNotifications(unreadData);
    } catch (error) {}

    try {
      const data = await axios
        .get(API_URL + `/notifications/approver?` + approverParams)
        .then((res) => res.data)
        .catch((err) => {
          alert(err.response.data.message);
        });

      const readData = data.filter((notification: any) => notification.read);
      setReadApproverNotifications(readData);

      const unreadData = data.filter((notification: any) => !notification.read);
      setApproverNotifications(unreadData);
    } catch (error) {}
  };
  React.useEffect(() => {
    getApproverNotifications.current();
  }, [currentUser]);

  return (
    <>
    <h1 className={"font-black text-3xl text-start "+headingTheme}>
        Notifications
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-11/12 mx-auto my-4">
        <div>
          <h2 className="text-xl text-start">
            User Notifications
          </h2>
          <div className="max-h-[400px] overflow-y-auto">
            {userNotifications.length > 0 ? (
              userNotifications.map((notification: any) => {
                return <Card key={notification._id} {...notification} />;
              })
            ) : (
              <p>No Notifications</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl text-start">
            Approve Notifications
          </h2>
          <div className="max-h-[400px] overflow-y-auto">
            {approverNotifications.length > 0 ? (
              approverNotifications.map((notification: any) => {
                return <Card key={notification._id} {...notification} />;
              })
            ) : (
              <p>No Notifications</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl text-start">
            Read Notifications
          </h2>
          <div className="max-h-[400px] overflow-y-auto">
            {readUserNotifications.length > 0 ? (
              readUserNotifications.map((notification: any) => {
                return <Card key={notification._id} {...notification} />;
              })
            ) : (
              <p>No Notifications</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl text-start">
            Read Approve Notifications
          </h2>
          <div className="max-h-[400px] overflow-y-auto">
            {readApproverNotifications.length > 0 ? (
              readApproverNotifications.map((notification: any) => {
                return <Card key={notification._id} {...notification} />;
              })
            ) : (
              <p>No Notifications</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
