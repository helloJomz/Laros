import { Request, Response } from "express";
import { APIKEY } from "../constants";
import axios from "axios";
import { SearchHistoryModel } from "../models/SearchHistory";
import mongoose from "mongoose";
import { stringToObjectId } from "../helpers";
import { UserModel } from "../models/User";

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
          limit: 5,
        },
      });
      return res.status(200).json(response.data.results);
    }
  } catch (error) {
    console.error(error);
  }
};

export const searchQueryController = async (req: Request, res: Response) => {
  const { query } = req.query;

  if (query) {
    const gameResponse = await axios.get(
      "https://www.giantbomb.com/api/games/",
      {
        params: {
          api_key: APIKEY!,
          field_list: "name,image,guid",
          filter: `name:${query.toString().toLowerCase()}`,
          format: "json",
          limit: 5,
        },
      }
    );

    const userResponse = await UserModel.find(
      {
        displayname: { $regex: query, $options: "i" },
      },
      { displayname: 1, _id: 1, imgURL: 1 }
    ).limit(5);

    return res.status(200).json({
      game: gameResponse.data.results,
      user: [...userResponse],
    });
  }
};

export const addRecentHistoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userid, ...rest } = req.body;

    if (!userid)
      return res.status(400).json({ message: "Userid is required." });

    const HistoryParams = {
      userid,
      ...rest,
    };

    const createdHistory = await SearchHistoryModel.create({
      ...HistoryParams,
    });

    return res.status(200).json(createdHistory);
  } catch (error) {
    console.error(error);
  }
};

export const getAllRecentHistoryController = async (
  req: Request,
  res: Response
) => {
  const { userid } = req.query;

  if (userid !== null && userid !== undefined && userid !== "null")
    return res
      .status(400)
      .json({ message: "UserId is required to get the recent history." });

  const objectUserId = stringToObjectId(userid as string);

  const histories = await SearchHistoryModel.find({
    userid: objectUserId,
  }).sort({ createdAt: -1 });

  return res.status(200).json(histories);
};

export const deleteOneRecentHistoryController = async (
  req: Request,
  res: Response
) => {
  const { userId, historyId } = req.body;

  if (!userId && !historyId)
    return res
      .status(400)
      .json({ message: "Userid and historyid is required." });

  const objectUserId = stringToObjectId(userId);
  const objectHistoryId = stringToObjectId(historyId);

  const deletedHistory = await SearchHistoryModel.findOneAndDelete({
    userid: objectUserId,
    _id: objectHistoryId,
  });

  console.log(deletedHistory);

  return res.status(200).json(deletedHistory);
};

export const deleteAllRecentHistoryController = async (
  req: Request,
  res: Response
) => {
  const { userid } = req.body;
  if (!userid)
    return res
      .status(400)
      .json({ message: "UserId is required to get the recent history." });
  const objectUserId = stringToObjectId(userid);
  const response = await SearchHistoryModel.deleteMany({
    userid: objectUserId,
  });
  return res.status(200).json(response);
};
