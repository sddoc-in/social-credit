import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { Collection, Db, ReturnDocument } from "mongodb";
import connectToCluster from "../connection/connect";
import ConnectionRes from "../interface/ConnectionRes";
import { validateSession } from "../functions/hash";
import { validateToken } from "../functions/bearer";
import PannelUser from "../interface/PannelUSer";
import { closeConn } from "../connection/closeConn";
import isvalidateRole from "../functions/validations/validateRole";
import isValidObjectId from "../functions/validations/isValidObjectId";

// create a new pannel user
export async function createPannelUser(req: Request, res: Response) {
  const { name, username, email, password, role, access_token, session, puid } =
    req.body;
  try {
    if (!name || !username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // HERE IS VALIDATE FORM DATA.
    if (!isvalidateRole(role)) {
      return res.status(400).json({ message: "Invalid Role" });
    }

    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("PanelUser");
    const pannelUser: PannelUser = req.body;
    const PannelUsercollection: Collection = db.collection("pannelusers");
    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res.status(401).json({ message: "Session invalid" });
    }

    let tokenErr = validateToken(access_token);
    if (tokenErr !== "") {
      return res.status(401).json({ message: tokenErr });
    }

    //create client if everything is valid
    const puid = v4();

    // Create a new user
    const newUser: PannelUser = {
      puid,
      name,
      username,
      email,
      password,
      role,
      created: new Date(),
    };
    await PannelUsercollection.insertOne(newUser);

    return res
      .status(200)
      .json({ message: "PannelUser created successfully", puid: puid });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//delete a pannel user
export async function deletePannelUser(req: Request, res: Response) {
    const {puid,session,access_token} = req.body;
    try{
        //validate request parameters
        if(!puid || !isValidObjectId(puid as string)){
            return res.status(400).json({message: 'Invalid puid'});
        }

      // Create connection to the database
      const connect: ConnectionRes = await connectToCluster();
      if (typeof connect.conn === "string") {
        return res.status(500).json(connect);
      }
      const conn = connect.conn;
      const db: Db = conn.db("PanelUser");
      const pannelUser: PannelUser = req.body;
      const PannelUsercollection: Collection = db.collection("pannelusers");
      //check session
      let sessionBool = validateSession(session);
      if (sessionBool) {
        return res.status(401).json({ message: "Session invalid" });
      }
  
      let tokenErr = validateToken(access_token);
      if (tokenErr !== "") {
        return res.status(401).json({ message: tokenErr });
      }

      //perform the delete operation
      await PannelUsercollection.deleteOne({ _id: new ObjectId(puid as string) });

      return res.status(200).json({ message: 'PannelUser deleted successfully' });
    }
     catch(err){
        console.log(err);
        return res.status(500).json({message: "PannelUser Deleting Error"});
    }
}

// update a pannel user
export async function updatePannelUser(req: Request, res: Response) {
    const {puid,session,access_token} = req.body;
    const { name, username, email, password, role } = req.body;
    try{
        //validate request parameters
        if(!puid || !isValidObjectId(puid as string)){
            return res.status(400).json({message: 'Invalid puid'});
        }

        if (!name || !username || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!isvalidateRole(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
      // Create connection to the database
      const connect: ConnectionRes = await connectToCluster();
      if (typeof connect.conn === "string") {
        return res.status(500).json(connect);
      }
      const conn = connect.conn;
      const db: Db = conn.db("PanelUser");
      const pannelUser: PannelUser = req.body;
      const PannelUsercollection: Collection = db.collection("pannelusers");
      //check session
      let sessionBool = validateSession(session);
      if (sessionBool) {
        return res.status(401).json({ message: "Session invalid" });
      }
  
      let tokenErr = validateToken(access_token);
      if (tokenErr !== "") {
        return res.status(401).json({ message: tokenErr });
      }

      //perform the update operation
      await PannelUsercollection.updateOne(
        { _id: new ObjectId(puid as string) },
        { $set: { name, username, email, password, role } }
      );

      return res.status(200).json({ message: 'PannelUser updated successfully' });
    }
     catch(err){
        console.log(err);
        return res.status(500).json({message: "PannelUser Updating Error"});
    }
}

//get all pannel users
export async function getAllPannelUsers(req: Request, res: Response) {
    try{
        // Create connection to the database
        const connect: ConnectionRes = await connectToCluster();
        if (typeof connect.conn === "string") {
          return res.status(500).json(connect);
        }
        const conn = connect.conn;
        const db: Db = conn.db("PanelUser");
        const pannelUser: PannelUser = req.body;
        const PannelUsercollection: Collection = db.collection("pannelusers")
        
        //perform database operation;
        const allPannelUsers = await PannelUsercollection.find().toArray();
        return res.status(200).json(allPannelUsers);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "PannelUser Retrieving Error"});
    }
}
