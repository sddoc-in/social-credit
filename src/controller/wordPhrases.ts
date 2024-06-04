import { Request,Response } from "express";
import { Collection, Db } from "mongodb";
import connectToCluster from "../connection/connect";
import ConnectionRes from "../interface/ConnectionRes";
import { validateToken } from "../functions/bearer";
import { closeConn } from "../connection/closeConn";
import { validateSession } from "../functions/hash";

export async function getAllWordPhrases(req: Request, res: Response) {
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
    const db: Db = conn.db("discord");
    const WordPhrasesCollection: Collection = db.collection("wordphrases");
    const allWordPhrases = await WordPhrasesCollection.find({},
      { projection: { _id: 0 } }).toArray();

    closeConn(conn);
    return res.status(200).json(allWordPhrases);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

