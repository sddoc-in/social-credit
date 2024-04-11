import { Request, Response } from "express";
import connectToCluster from "../connection/connect";
import { Collection, Db, ObjectId } from "mongodb";
import ConnectionRes from "../interface/ConnectionRes";
import { validateSession } from "../functions/hash";
import { validateToken } from "../functions/bearer";
import { closeConn } from "../connection/closeConn";

export async function getApproverNotifications(req: Request, res: Response) {
  const approver = req.query.approver as string;
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;

  try {
    if (!approver) {
      return res.status(400).json({ message: "Approver not provided" });
    }
    if (!session) {
      return res.status(400).json({ message: "Session not provided" });
    }
    if (!access_token) {
      return res.status(400).json({ message: "Access Token not provided" });
    }

    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login Again" });
    }

    let tokenErr = validateToken(access_token);
    if (tokenErr !== "") {
      return res.status(401).json({ message: tokenErr });
    }

    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("discord");
    const notificationsCollection: Collection = db.collection("notifications");
    const panelusercollection: Collection = conn
      .db("PanelUser")
      .collection("pannelusers");

    const notifications = await notificationsCollection
      .find(
        { approver: approver },
        {
          projection: {
            _id: 1,
            uid: 1,
            approver: 1,
            status: 1,
            message: 1,
            type: 1,
            read: 1,
            cancel: 1,
            approved: 1,
            data: 1,
          },
        }
      )
      .toArray();

    if (!notifications) {
      return res.status(404).json({ message: "Notifications not found" });
    }

    let notificationsWithUserDetails = [];

    for (let i = 0; i < notifications.length; i++) {
      const user = await panelusercollection.findOne(
        {
          uid: notifications[i].uid,
        },
        {
          projection: {
            _id: 0,
            role: 1,
            username: 1,
            name: 1,
          },
        }
      );
      notificationsWithUserDetails.push({ ...notifications[i], user });
    }

    closeConn(conn);

    return res.status(200).json(notificationsWithUserDetails);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNotifications(req: Request, res: Response) {
  const uid = req.query.uid as string;
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;

  try {
    if (!uid) {
      return res.status(400).json({ message: "User ID not provided" });
    }
    if (!session) {
      return res.status(400).json({ message: "Session not provided" });
    }
    if (!access_token) {
      return res.status(400).json({ message: "Access Token not provided" });
    }

    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login Again" });
    }

    let tokenErr = validateToken(access_token);
    if (tokenErr !== "") {
      return res.status(401).json({ message: tokenErr });
    }

    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("discord");
    const notificationsCollection: Collection = db.collection("notifications");
    const panelusercollection: Collection = conn
      .db("PanelUser")
      .collection("pannelusers");

    const notifications = await notificationsCollection
      .find(
        { uid: uid },
        {
          projection: {
            _id: 1,
            uid: 1,
            approver: 1,
            status: 1,
            message: 1,
            type: 1,
            read: 1,
            cancel: 1,
            approved: 1,
            data: 1,
          },
        }
      )
      .toArray();

    if (!notifications) {
      return res.status(404).json({ message: "Notifications not found" });
    }

    let notificationsWithUserDetails = [];

    for (let i = 0; i < notifications.length; i++) {
      const user = await panelusercollection.findOne(
        {
          uid: notifications[i].approver,
        },
        {
          projection: {
            _id: 0,
            role: 1,
            username: 1,
            name: 1,
          },
        }
      );
      notificationsWithUserDetails.push({ ...notifications[i], user });
    }

    closeConn(conn);

    return res.status(200).json(notificationsWithUserDetails);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNotification(req: Request, res: Response) {
  const uid = req.query.uid as string;
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;
  const { notificationId, status, type } = req.body;

  try {
    if (!notificationId) {
      return res.status(400).json({ message: "Notification ID not provided" });
    }
    if (!session) {
      return res.status(400).json({ message: "Session not provided" });
    }
    if (!access_token) {
      return res.status(400).json({ message: "Access Token not provided" });
    }
    if (status === undefined) {
      return res.status(400).json({ message: "Status not provided" });
    }
    if (type === undefined) {
      return res.status(400).json({ message: "Type not provided" });
    }

    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login Again" });
    }

    let tokenErr = validateToken(access_token);
    if (tokenErr !== "") {
      return res.status(401).json({ message: tokenErr });
    }

    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("discord");
    const notificationsCollection: Collection = db.collection("notifications");
    const Phrasescollection: Collection = db.collection("phrases");

    if (status === "approve") {
      const updatedNotification =
        await notificationsCollection.findOneAndUpdate(
          { _id: new ObjectId(notificationId as string) },
          {
            $set: {
              approved: true,
              read: true,
            },
          }
        );

      if (!updatedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      if (type === "phrase-create") {
        await Phrasescollection.insertOne(updatedNotification.data);
        await db.collection("mostusedphrases").insertOne({
          phrase: updatedNotification.data.phrase,
          used_count: 0,
          total_gained_points: 0,
          last_used: "",
          data: [],
        });
      } else if (type === "phrase-update") {
        await Phrasescollection.updateOne(
          { _id: new ObjectId(updatedNotification.data.phrase_id as string) },
          { $set: updatedNotification.data }
        );
      } else if (type === "phrase-delete") {
        await Phrasescollection.deleteOne({
          _id: new ObjectId(updatedNotification.data.phrase_id as string),
        });
      } else if (type === "discord-points-lower") {
        const user = await conn
          .db("PanelUser")
          .collection("pannelusers")
          .findOne({ uid: uid });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        let currentTime = new Date().getTime();
        if (user.last_message_time > currentTime - 60000) {
          return res.status(400).json({
            message: "Please wait for 1 minute before sending another request",
          });
        }
        await db.collection("users").updateOne(
          { userId: updatedNotification.data.userId },
          {
            $inc: {
              total_points_gained:  updatedNotification.data.lower_points,
            },
          }
        );

        await conn
          .db("PanelUser")
          .collection("pannelusers")
          .updateOne(
            { uid: uid },
            {
              $set: {
                last_message_time: new Date().getTime(),
              },
            }
          );
      }
    } else if (status === "cancel") {
      const updatedNotification =
        await notificationsCollection.findOneAndUpdate(
          { _id: new ObjectId(notificationId as string) },
          {
            $set: {
              approved: false,
              read: true,
              cancel: true,
            },
          }
        );

      if (!updatedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }
    } else if (status === "read") {
      const updatedNotification =
        await notificationsCollection.findOneAndUpdate(
          { _id: new ObjectId(notificationId as string) },
          {
            $set: {
              read: true,
            },
          }
        );

      if (!updatedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }
    }

    closeConn(conn);

    return res.status(200).json({ message: "Notification updated" });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
