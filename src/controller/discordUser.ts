import { Request, Response } from "express";
import { Collection, Db } from "mongodb";
import connectToCluster from "../connection/connect";
import ConnectionRes from "../interface/ConnectionRes";
import { validateSession } from "../functions/hash";
import { validateToken } from "../functions/bearer";
import DiscordUser from "../interface/DiscordUser";
import { Long } from "mongodb";

export async function getdiscordUser(req: Request, res: Response) {
  const userId = req.query.userId as string;
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;
  try {
    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res.status(401).json({ message: "Session invalid. Please Login Again" });
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
    const usercollection: Collection = db.collection("users");

    // find the user by userId
    const user = await usercollection.findOne(
      {
        userId: Long.fromString(userId),
      },
      {
        projection: {
          _id:0,
          userId: {
            $toString: "$userId",
          },
          username: 1,
          total_points: 1,
          last_message_time: 1,
          data: 1,
        },
      }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching user" });
  }
}

export async function UpdateUser(req: Request, res: Response) {
  try {
    const username = req.params.username; //userName is provided in the request parameters
    const { access_token, session } = req.body;
    const updatedUser: DiscordUser = req.body;

    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("DiscordUser");
    // const pannelUser: PannelUser = req.body;
    const usercollection: Collection = db.collection("user");
    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res.status(401).json({ message: "Session invalid. Please Login Again" });
    }

    let tokenErr = validateToken(access_token);
    if (tokenErr !== "") {
      return res.status(401).json({ message: tokenErr });
    }

    // update the user
    const result = await usercollection.updateOne(
      { username },
      { $set: updatedUser }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating user" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const username = req.params.username; //userName is provided in the request parameters
    const { access_token, session } = req.body;
    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("DiscordUser");
    // const pannelUser: PannelUser = req.body;
    const usercollection: Collection = db.collection("user");
    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res.status(401).json({ message: "Session invalid. Please Login Again" });
    }

    let tokenErr = validateToken(access_token);
    if (tokenErr !== "") {
      return res.status(401).json({ message: tokenErr });
    }

    //Delete the user by username
    const result = await usercollection.deleteOne({ username });
    if (!result || !result.deletedCount) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting user" });
  }
}

export async function getAllUser(req: Request, res: Response) {
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;

  try {
    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res.status(401).json({ message: "Session invalid. Please Login Again" });
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
    const usercollection: Collection = db.collection("users");

    // find only username,userId,total_points
    let users = await usercollection
      .find(
        {},
        {
          projection: {
            _id: 0,
            username: 1,
            userId: {
              $toString: "$userId",
            },
            total_points: 1,
          },
        }
      )
      .toArray();

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching users" });
  }
}
