import { Request, Response } from "express";
import { v4 } from "uuid";
import { Collection, Db } from "mongodb";
import connectToCluster from "../connection/connect";
import ConnectionRes from "../interface/ConnectionRes";
import { validateToken, createBearer } from "../functions/bearer";
import PannelUser from "../interface/PannelUser";
import { createSession, hash, validateSession } from "../functions/hash";
import isvalidateRole from "../functions/validations/validateRole";
import { closeConn } from "../connection/closeConn";

export async function createPannelUser(req: Request, res: Response) {
  const { name, username, email, password, role } = req.body;
  const access_token = req.query.access_token as string;
  const session = req.query.session as string;
  const uid = req.query.uid as string;

  try {
    // Check if all required fields are provided
    if (!name || !username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role
    if (!isvalidateRole(role)) {
      return res.status(400).json({ message: "Invalid Role" });
    }

    // Check session validity
    if (validateSession(session)) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login again." });
    }

    // Check access token validity
    const tokenErr = validateToken(access_token);
    if (tokenErr) {
      return res.status(401).json({ message: tokenErr });
    }

    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("PanelUser");
    const PannelUsercollection: Collection = db.collection("pannelusers");
    const sessionCollection: Collection = db.collection("sessions");

    const curentUser = await PannelUsercollection.findOne({ uid: uid });
    if(!curentUser){
      return res.status(404).json({ message: "User not found" });
    }
    if (curentUser!.role !== "supreme_leader") {
      return res
        .status(401)
        .json({ message: "You are not authorized to create a new user" });
    }

    // Check if email already exists
    const existingUser = await PannelUsercollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Generate unique ID for the user
    const puid = v4();

    // Create new session and token
    const sessionNew = createSession();
    const token = createBearer(email, uid, sessionNew);

    // Hash password
    const hashedPassword = hash(password);

    // Create a new user object
    const paneluser: PannelUser = {
      uid: puid,
      name,
      username,
      email,
      password: hashedPassword,
      role,
      access_token: token,
      session: sessionNew,
      created: new Date(),
      status: "active",
    };

    // Insert the new user into the database
    await PannelUsercollection.insertOne(paneluser);

    // Insert session data
    await sessionCollection.insertOne({
      activity: "user-register",
      session,
      uid,
      created: new Date(),
    });
    closeConn(conn);
    // Return success message along with the generated unique ID
    return res.status(201).json({
      message: "PanelUser created successfully",
      paneluser: paneluser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in creating user" });
  } finally {
    // Close database connection
  }
}

//delete a pannel user
export async function deletePannelUser(req: Request, res: Response) {
  const uid = req.query.uid as string;
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;
  const puid = req.query.puid as string;
  try {
    //validate request parameters
    if (!uid) {
      return res.status(400).json({ message: "Invalid uid" });
    }
    //check session
    if (validateSession(session)) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login again." });
    }

    const tokenErr = validateToken(access_token);
    if (tokenErr) {
      return res.status(401).json({ message: tokenErr });
    }

    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("PanelUser");
    const PannelUsercollection: Collection = db.collection("pannelusers");

    const curentUser = await PannelUsercollection.findOne({ uid: uid });
    if(!curentUser){
      return res.status(404).json({ message: "User not found" });
    }
    if (curentUser!.role !== "supreme_leader") {
      return res
        .status(401)
        .json({ message: "You are not authorized to create a new user" });
    }

    //perform the delete operation
    await PannelUsercollection.deleteOne({ uid: puid });

    return res.status(200).json({ message: "PannelUser deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "PannelUser Deleting Error" });
  }
}

// update a pannel user
export async function updatePannelUser(req: Request, res: Response) {
  const uid = req.query.uid as string;
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;
  const { name, username, email, role, status, uid: puid } = req.body;
  try {
    if (!uid) {
      return res.status(400).json({ message: "Invalid uid" });
    }

    if (!name || !username || !email || !role || !puid || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!isvalidateRole(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    //check session
    if (validateSession(session)) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login again." });
    }

    const tokenErr = validateToken(access_token);
    if (tokenErr) {
      return res.status(401).json({ message: tokenErr });
    }

    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("PanelUser");
    const PannelUsercollection: Collection = db.collection("pannelusers");

    const curentUser = await PannelUsercollection.findOne({ uid: uid });
    if(!curentUser){
      return res.status(404).json({ message: "User not found" });
    }
    if (curentUser!.role !== "supreme_leader") {
      return res
        .status(401)
        .json({ message: "You are not authorized to create a new user" });
    }

    

    // pui exist
    const userToUpdate = await PannelUsercollection.findOne({ uid: puid });
    if (!userToUpdate) {
      closeConn(conn);
      return res
        .status(404)
        .json({ message: "PannelUser with the provided uid does not exist" });
    }

    //perform the update operation
    await PannelUsercollection.updateOne(
      { uid: puid },
      {
        $set: {
          name: name,
          role: role,
          email: email,
          username: username,
          status: status ? status : "active",
          modified: new Date(),
        },
      }
    );
    // closeConn(conn);
    return res.status(200).json({ message: "PannelUser updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "PannelUser Updating Error" });
  }
}

//get all pannel users
export async function getAllPannelUsers(req: Request, res: Response) {
  const access_token = req.query.access_token as string;
  const session = req.query.session as string;

  try {
    // Check session validity
    if (validateSession(session)) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login again." });
    }

    // Check access token validity
    const tokenErr = validateToken(access_token);
    if (tokenErr) {
      return res.status(401).json({ message: tokenErr });
    }
    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("PanelUser");
    const PannelUsercollection: Collection = db.collection("pannelusers");

    //perform database operation;
    const allPannelUsers = await PannelUsercollection.find(
      {},
      {
        projection: {
          uid: 1,
          name: 1,
          username: 1,
          email: 1,
          role: 1,
          status: 1,
          _id: 0,
        },
      }
    ).toArray();

    closeConn(conn);
    return res.status(200).json(allPannelUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "PannelUser Retrieving Error" });
  }
}
