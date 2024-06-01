import { Request, Response } from "express";
import { APIKEY } from "../constants";
import axios from "axios";
import { SearchHistoryModel } from "../models/SearchHistory";
import mongoose from "mongoose";

export const getGameListByQueryController = async (
  req: Request,
  res: Response
) => {
  const { query } = req.params;

  try {
    if (query !== "null") {
      const response = await axios.get("https://www.giantbomb.com/api/games/", {
        params: {
          api_key: APIKEY!,
          field_list: "name,image,platforms,guid,deck",
          filter: `name:${query!.toLowerCase()}`,
          format: "json",
          limit: 10,
        },
      });
      return res.status(200).json(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const upsertRecentHistoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { query, trackerid, userid, origin, imageURL } = req.body;

    if (!origin || !userid)
      return res
        .status(400)
        .json({ message: "Origin and User ID must have a value." });

    const _id = mongoose.Types.ObjectId.createFromHexString(userid);

    // Check if the query already exists in the database
    const isDuplicated = await SearchHistoryModel.findOne({
      userid: _id,
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
};

export const getAllRecentHistoryController = async (
  req: Request,
  res: Response
) => {
  const { userid } = req.params;

  if (!userid)
    return res
      .status(400)
      .json({ message: "UserId is required to get the recent history." });

  const _id = mongoose.Types.ObjectId.createFromHexString(userid);

  // Aggregate to sort the array of documents by timestamp
  const recentHistory = await SearchHistoryModel.aggregate([
    { $match: { userid: _id } }, // Filter by userid
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
};

export const deleteOneRecentHistoryController = async (
  req: Request,
  res: Response
) => {
  const { userid, historyid } = req.body;
  const _id = mongoose.Types.ObjectId.createFromHexString(historyid);
  const response = await SearchHistoryModel.updateOne(
    { userid: userid },
    { $pull: { history: { _id: _id } } }
  );
  return res.status(200).json(response);
};

export const deleteAllRecentHistoryController = async (
  req: Request,
  res: Response
) => {
  const { userid } = req.body;
  const response = await SearchHistoryModel.deleteOne({ userid: userid });
  return res.status(200).json(response);
};
