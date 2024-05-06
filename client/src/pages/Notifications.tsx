import React from "react";
import { AppContext } from "../context/Context";
import axios from "axios";
import { API_URL } from "../constants/data";
import Card from "../components/dashboard/notifications/Card";
import Loading from "../components/loader/Loading";

export default function Notifications() {
  const { user: currentUser } = React.useContext(AppContext);
  const [load, setLoad ] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);

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
      setLoad(true);
      const data = await axios
        .get(API_URL + `/notifications/user?` + params)
        .then((res) => res.data)
        .catch((err) => {
          alert(err.response.data.message);
        });
      setLoad(false);
      const readData = data.filter((notification: any) => notification.read);
      setReadUserNotifications(readData);

      const unreadData = data.filter((notification: any) => !notification.read);
      setUserNotifications(unreadData);
    } catch (error) {}

    try {
      setLoad(true);
      const data = await axios
        .get(API_URL + `/notifications/approver?` + approverParams)
        .then((res) => res.data)
        .catch((err) => {
          alert(err.response.data.message);
        });
       setLoad(false);
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
    {load && <Loading />}
      <h1 className="text-3xl text-start text-black ">
        Notifications
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-11/12 mx-auto my-4">
        <div>
          <h2 className="text-xl text-start text-black ">
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
          <h2 className="text-xl text-start text-black ">
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
          <h2 className="text-xl text-start text-black ">
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
          <h2 className="text-xl text-start text-black ">
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
