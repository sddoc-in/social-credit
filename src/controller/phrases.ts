import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { Collection, Db } from "mongodb";
import connectToCluster from "../connection/connect";
import ConnectionRes from "../interface/ConnectionRes";
import Phrases from "../interface/Phrases";
import { validateSession } from "../functions/hash";
import { validateToken } from "../functions/bearer";
import { closeConn } from "../connection/closeConn";
import { Long } from "mongodb";

// create a new phrase
export async function createPhrase(req: Request, res: Response) {
  const { phrase, points, approver } = req.body;
  const uid = req.query.uid as string;
  const access_token = req.query.access_token as string;
  const session = req.query.session as string;
  try {
    // Check if all required fields are provided
    if (!phrase || !points) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!access_token) {
      return res.status(400).json({ message: "Access token is required" });
    }
    if (!session) {
      return res.status(400).json({ message: "Session is required" });
    }

    if (!phrase || typeof phrase !== "string") {
      return res
        .status(400)
        .json({ messgae: "Phrase is required and must be a string" });
    }

    if (validateSession(session)) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login again." });
    }

    const tokenErr = validateToken(access_token);
    if (tokenErr) {
      return res.status(401).json({ message: tokenErr });
    }

    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const panelusers: Db = conn.db("PanelUser");
    const db: Db = conn.db("discord");
    const Phrasescollection: Collection = db.collection("wordphrases");
    const notificationCollection: Collection = db.collection("notifications");

    const existingPhrase = await Phrasescollection.findOne({ phrase: phrase });
    if (existingPhrase) {
      closeConn(conn);
      return res.status(400).json({ messgae: "Phrase already exists" });
    }

    const phrase_id = v4();

    const newPhrase: Phrases = {
      phrase_id: phrase_id,
      phrase: phrase,
      points: parseInt(points),
      createdOn: new Date(),
      createdBy: uid,
      modified: new Date(),
    };

    const user = await panelusers
      .collection("pannelusers")
      .findOne({ uid: uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "supreme_leader") {
      await Phrasescollection.insertOne(newPhrase);
      await db.collection("mostusedphrases").insertOne({
        phrase: phrase,
        used_count: 0,
        total_gained_points: 0,
        last_used: "",
        data: [],
      });
      closeConn(conn);
      return res.status(201).json({ message: "Phrase created successfully." });
    }

    if (!approver) {
      return res.status(400).json({ message: "Approver is required" });
    }

    await notificationCollection.insertOne({
      uid: uid,
      message: `Phrase ${phrase} Approval Needed`,
      type: "phrase-create",
      read: false,
      approved: false,
      approver: approver,
      cancel:false,
      data: newPhrase,
      createdOn: new Date(),
    });
    closeConn(conn);
    return res.status(201).json({ message: "Approval Send successfully." });
  } catch (error) {
    console.error("Error creating phrase:", error);
    return res
      .status(500)
      .json({ messgae: "An error occurred while creating phrase" });
  }
}

// update phrase
export async function updatePhrase(req: Request, res: Response) {
  const uid = req.query.uid as string;
  const access_token = req.query.access_token as string;
  const session = req.query.session as string;
  const { phrase_id, phrase, approver, points } = req.body;
  try {
    if (!phrase_id) {
      return res.status(400).json({ message: "Required Phrase id" });
    }
    if (!phrase) {
      return res.status(400).json({ message: "Required Phrase" });
    }
    if (!points) {
      return res.status(400).json({ message: "Required Points" });
    }
    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!access_token) {
      return res.status(400).json({ message: "Access token is required" });
    }
    if (!session) {
      return res.status(400).json({ message: "Session is required" });
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
    const db: Db = conn.db("discord");
    const panelusers: Db = conn.db("PanelUser");
    const Phrasescollection: Collection = db.collection("wordphrases");
    const notificationCollection: Collection = db.collection("notifications");

    const existingPhrase = await Phrasescollection.findOne({
      phrase_id: phrase_id,
    });
    if (!existingPhrase) {
      closeConn(conn);
      return res.status(404).json({ messgae: "Phrase not found" });
    }

    const updatePhrase: Phrases = {
      phrase_id: existingPhrase.phrase_id,
      phrase: phrase,
      points: parseInt(points),
      modified: new Date(),
    };

    const user = await panelusers
      .collection("pannelusers")
      .findOne({ uid: uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "supreme_leader") {
      await Phrasescollection.updateOne(
        { phrase_id: phrase_id },
        { $set: updatePhrase  }
      );
      closeConn(conn);
      return res.status(201).json({ message: "Phrase Updated successfully." });
    }

    if (!approver) {
      return res.status(400).json({ message: "Required Approver" });
    }

    await notificationCollection.insertOne({
      uid: uid,
      message: `Phrase ${phrase} Approval Needed`,
      type: "phrase-update",
      read: false,
      approved: false,
      approver: approver,
      cancel:false,
      data: updatePhrase,
      createdOn: new Date(),
    });

    closeConn(conn);
    return res.status(200).json({ message: "Request Send Successfully." });
  } catch (error) {
    console.error("Error updating phrase:", error);
    return res
      .status(500)
      .json({ messgae: "An error occurred while updating phrase" });
  }
}

// delete a phrase
export async function deletePhrase(req: Request, res: Response) {
  const phrase_id = req.query.phrase_id;
  const approver = req.query.approver;
  const uid = req.query.uid as string;
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;

  try {
    if (!phrase_id) {
      return res.status(400).json({ message: "Required Phrase id" });
    }
    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!access_token) {
      return res.status(400).json({ message: "Access token is required" });
    }
    if (!session) {
      return res.status(400).json({ message: "Session is required" });
    }

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
    const db: Db = conn.db("discord");
    const panelusers: Db = conn.db("PanelUser");
    const Phrasescollection: Collection = db.collection("wordphrases");
    const notificationCollection: Collection = db.collection("notifications");

    const user = await panelusers
      .collection("pannelusers")
      .findOne({ uid: uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "supreme_leader") {
      await Phrasescollection.deleteOne({ phrase_id: phrase_id });
      closeConn(conn);
      return res.status(201).json({ message: "Phrase Deleted successfully." });
    }

    if (!approver) {
      return res.status(400).json({ message: "Required Approver" });
    }

    const phrase = await Phrasescollection.findOne({ phrase_id: phrase_id });

    await notificationCollection.insertOne({
      uid: uid,
      message: `Phrase ${phrase?.phrase} Approval Needed`,
      type: "phrase-delete",
      read: false,
      approved: false,
      approver: approver,
      cancel:false,
      data: {
        phrase_id: phrase_id,
        phrase: phrase?.phrase,
        points: phrase?.points,
      },
      createdOn: new Date(),
    });

    closeConn(conn);

    return res.status(200).json({ message: "Approver Sent successfully" });
  } catch (error) {
    console.error("Error deleting phrase:", error);
    return res
      .status(500)
      .json({ messgae: "An error occurred while deleting phrase" });
  }
}

// get all phrases
export async function getAllPhrases(req: Request, res: Response) {
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;

  try {
    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login again." });
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
    const UsedPhrasescollection: Collection = db.collection("mostusedphrases");
    const Phrasescollection: Collection = db.collection("wordphrases");

    let allPhrases = await Phrasescollection.find(
      {},
      { projection: { _id: 0, phrase: 1, phrase_id: 1, points: 1 } }
    ).toArray();

    let phrasesWithUsage: any = [];

    for (let phrase of allPhrases) {
      let phraseUsage = await UsedPhrasescollection.findOne(
        { phrase: phrase.phrase },
        { projection: { used_count: 1, _id: 0 } }
      );
      phrasesWithUsage.push({ ...phrase, usage: phraseUsage?.used_count });
    }

    return res.status(200).json(phrasesWithUsage);
  } catch (error) {
    console.error("Error getting all phrases:", error);
    return res
      .status(500)
      .json({ messgae: "An error occurred while getting all phrases" });
  }
}

export async function getPhraseDetails(req: Request, res: Response) {
  const phrase_id = req.query.phrase_id as string;
  const session = req.query.session as string;
  const access_token = req.query.access_token as string;

  try {
    //check session
    let sessionBool = validateSession(session);
    if (sessionBool) {
      return res
        .status(401)
        .json({ message: "Session invalid. Please Login again." });
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
    const Phrasescollection: Collection = db.collection("mostusedphrases");
    const wordphrases: Collection = db.collection("wordphrases");

    const phrase = await wordphrases.findOne({ phrase_id: phrase_id });

    if (!phrase) {
      return res.status(404).json({ messgae: "Phrase not found" });
    }

    let phraseDetails = await Phrasescollection.findOne(
      { phrase: phrase.phrase },
      {
        projection: {
          _id: 0,
          last_used: 1,
          total_gained_points: 1,
          data: {
            userId: 1,
            username: 1,
            message: 1,
            added_points: 1,
            date: 1,
          },
        },
      }
    );
    if (!phraseDetails) {
      return res.status(200).json({
        phrase_id: phrase.phrase_id,
        phrase: phrase.phrase,
        points: phrase.points,
        total_gained_points: 0,
        last_used: "",
        data: [],
      });
    }

    let UserphraseDetails = phraseDetails.data.map((item: any) => {
      return {
        userId: new Long(
          item.userId.low,
          item.userId.high,
          item.userId.unsigned
        ).toString(),
        username: item.username,
        message: item.message,
        added_points: item.added_points,
        date: item.date,
      };
    });

    return res.status(200).json({
      phrase_id: phrase.phrase_id,
      phrase: phrase.phrase,
      points: phrase.points,
      total_gained_points: phraseDetails.total_gained_points,
      last_used: phraseDetails.last_used,
      data: UserphraseDetails,
    });
  } catch (error) {
    console.error("Error getting phrase details:", error);
    return res
      .status(500)
      .json({ messgae: "An error occurred while getting phrase details" });
  }
}
