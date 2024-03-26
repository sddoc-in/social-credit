import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { Collection, Db} from "mongodb";
import connectToCluster from "../connection/connect";
import ConnectionRes from "../interface/ConnectionRes";
import Phrases from "../interface/Phrases";
import DiscordUser from "../interface/DiscordUser";



// create a new phrase
export async function createPhrase(req: Request, res: Response) {
  try {
    const phraseData: Phrases = req.body;

    // Validation
    if (!phraseData.phrase || typeof phraseData.phrase !== "string") {
      return res
        .status(400)
        .json({ error: "Phrase is required and must be a string" });
    }
    if (typeof phraseData.points !== "number" || phraseData.points < 0) {
      return res
        .status(400)
        .json({ error: "Points must be a non-negative number" });
    }
    if (typeof phraseData.timesUsed !== "number" || phraseData.timesUsed < 0) {
      return res
        .status(400)
        .json({ error: "Times used must be a non-negative number" });
    }

    // Generate unique ID for phrase
    const pid = v4();
    phraseData.pid = pid;

    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("Phrases");
    const phrase: Phrases = req.body;
    const Phrasescollection: Collection = db.collection("phrases");

    // Create a new phrase
    await Phrasescollection.insertOne(phraseData);
    return res.status(201).json({ message: "Phrase created successfully" });
  } catch (error) {
    console.error("Error creating phrase:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating phrase" });
  }
}

// update phrase
export async function updatePhrase(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const phraseData: Phrases = req.body;
    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("Phrases");
    const phrase: Phrases = req.body;
    const Phrasescollection: Collection = db.collection("phrases");

    // Validation
    const result = await Phrasescollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: phraseData }
    );
    if (!result || !result.value) {
      return res.status(404).json({ error: "Phrase not found" });
    }
    return res.status(200).json({ message: "Phrase updated successfully" });
  } catch (error) {
    console.error("Error updating phrase:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating phrase" });
  }
}

// delete a phrase
export async function deletePhrase(req: Request, res: Response) {
  try {
    const id = req.params.id;
    // Create connection to the database
    const connect: ConnectionRes = await connectToCluster();
    if (typeof connect.conn === "string") {
      return res.status(500).json(connect);
    }
    const conn = connect.conn;
    const db: Db = conn.db("Phrases");
    const phrase: Phrases = req.body;
    const Phrasescollection: Collection = db.collection("phrases");

    // Validation
    const result = await Phrasescollection.deleteOne({ _id: new ObjectId(id) });
    if (!result || !result.deletedCount) {
      return res.status(404).json({ error: "Phrase not found" });
    }
    return res.status(200).json({ message: "Phrase deleted successfully" });
  } catch (error) {
    console.error("Error deleting phrase:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting phrase" });
  }
}

// get all phrases
export async function getAllPhrases(req: Request, res: Response) {

    try {
        // Create connection to the database
        const connect: ConnectionRes = await connectToCluster();
        if (typeof connect.conn === "string") {
        return res.status(500).json(connect);
        }
        const conn = connect.conn;
        const db: Db = conn.db("Phrases");
        const Phrasescollection: Collection = db.collection("phrases");
    
        // Get all phrases
        const allPhrases = await Phrasescollection.find().toArray();
        return res.status(200).json(allPhrases);
    } catch (error) {
        console.error("Error getting all phrases:", error);
        return res
        .status(500)
        .json({ error: "An error occurred while getting all phrases" });
    }

}

//How many times Phrases used by discord users
export async function phraseUsageCount(req:Request, res:Response){

    try {
        const phraseName = req.params.phrase;   //Assuming the phrase name is provided in the request parameters
        const userId = req.params.userId; //user ID is provided in the request parameters
        // Create connection to the database
         const connect: ConnectionRes = await connectToCluster();
         if (typeof connect.conn === "string") {
         return res.status(500).json(connect);
         }
         const conn = connect.conn;
         const db: Db = conn.db("Phrases");
         const Phrasescollection: Collection = db.collection("phrases");

         //find the phrase id based on the phrase name
         const phrase = await Phrasescollection.findOne({ phrase: phraseName });
         if (!phrase) {
             return res.status(404).json({ error: 'Phrase not found' });
         }
         const phraseId = phrase.pid;

         //Count how many times a phrase is used by a user
         const interactionCollection = db.collection("user_phrase_interactions");
         const usageCount= await interactionCollection.countDocuments(
            {
                pid:phraseId,
                userId:userId
            });

        return res.status(200).json({usageCount});
    }  catch (error) {
        console.error('Error fetching phrase usage count:', error);
        return res.status(500).json({ error: 'An error occurred while fetching phrase usage count' });
    }
}