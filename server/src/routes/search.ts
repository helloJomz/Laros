import { Router } from "express";
import { SearchHistoryModel } from "../models/SearchHistory";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const APIKEY = process.env.GIANTBOMB_API_KEY2!;
const router = Router();

// GET LIST OF GAMES BASED ON THE QUERY OF THE USER
router.get("/games/:query?", async (req, res) => {
  const { query } = req.params;
  try {
    const response = await axios.get("https://www.giantbomb.com/api/games/", {
      params: {
        api_key: APIKEY,
        field_list: "name,image,platforms,guid,deck",
        filter: `name:${query!.toLowerCase()}`,
        format: "json",
        limit: 10,
      },
    });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
});

// FOR CREATING SEARCH HISTORY
router.post("/recent_history", async (req, res) => {
  try {
    const { query, trackerid, userid, origin, imageURL } = req.body;

    if (!origin || !userid)
      return res
        .status(400)
        .json({ message: "Origin and User ID must have a value." });

    // Check if the query already exists in the database
    const isDuplicated = await SearchHistoryModel.findOne({
      userid: userid,
      "history.query": query,
    });

    if (isDuplicated)
      return res.status(400).json({ message: "History is already existing." });

    const HistoryParams = {
      origin: origin,
      query: query,
      trackerid: trackerid,
      imageURL: imageURL,
    };

    await SearchHistoryModel.updateOne(
      { userid: userid },
      { $push: { history: HistoryParams } },
      { upsert: true }
    );

    return res
      .status(200)
      .json({ message: "Recent search history is updated." });
  } catch (error) {
    console.error(error);
  }
});

// FOR GETTING THE RECENT HISTORY
router.get("/recent_history/:userid", async (req, res) => {
  const { userid } = req.params;

  if (!userid)
    return res
      .status(400)
      .json({ message: "UserId is required to get the recent history." });

  // Aggregate to sort the array of documents by timestamp
  const recentHistory = await SearchHistoryModel.aggregate([
    { $match: { userid: userid } }, // Filter by userid
    { $unwind: "$history" }, // Deconstruct the history array into separate documents
    { $sort: { "history.time": -1 } },
    { $limit: 10 },
    {
      $group: {
        _id: "$_id", // Group by _id to combine documents back into an array
        history: { $push: "$history" }, // Push each history document into an array
      },
    },
  ]);

  return res.status(200).json(recentHistory);
});

// FOR DELETING THE RECENT HISTORY
router.delete("/recent_history/:userid/:historyid", async (req, res) => {
  const { userid, historyid } = req.params;
  const _id = new mongoose.Types.ObjectId(historyid);
  const response = await SearchHistoryModel.updateOne(
    { userid: userid },
    { $pull: { history: { _id: _id } } }
  );
  return res.status(200).json(response);
});

export default router;
