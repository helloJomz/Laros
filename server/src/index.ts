import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { makeApiRequest } from "./utils/utils";
import { MakeAPIRequestProps } from "./utils/types";
import { UserModel } from "./models/User";
import { SearchHistoryModel } from "./models/SearchHistory";
import axios from "axios";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const CONNECTION: string = process.env.MONGODBCREDENTIALS!;
const PORT: string | number = process.env._PORT || 3000;
const APIKEY = process.env.GIANTBOMB_API_KEY2;
const giantBombAPIURL = "https://www.giantbomb.com/api/games/";

mongoose
  .connect(CONNECTION, {
    dbName: "Laros",
  })
  .then(() => {
    console.log("connected to the database");
    app.listen(PORT, () => {
      console.log(`listening to PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// FOR SIGNUP USERS
app.post("/api/users/signup", async (req, res) => {
  const { firstname, lastname, email, password, dateCreated } = req.body;
  try {
    if (!firstname || !lastname || !email || !password)
      return res.status(400).send({
        message:
          "Send all the required fields: firstname, lastname, email, and password!",
      });

    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    const user = await UserModel.create(newUser);

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
  }
});

// GET LIST OF GAMES BASED ON THE QUERY
app.get("/api/search/games/:query?", async (req, res) => {
  const { query } = req.params;

  let apiRequestParams: MakeAPIRequestProps;

  const commonParams: { field_list: string; limit: number } = {
    field_list: "name,image,platforms,guid,deck",
    limit: 10,
  };

  if (!APIKEY)
    return res.status(400).json({
      error: "API KEY IS NOT DEFINED!",
    });

  try {
    apiRequestParams = {
      url: giantBombAPIURL,
      apiKey: APIKEY,
      queryParams: {
        ...commonParams,
        filter: `name:${query!.toLowerCase()}`,
      },
    };

    const APIResponse = await makeApiRequest(apiRequestParams);
    res.json(APIResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// FOR CREATING SEARCH HISTORY
app.post("/api/recent_history", async (req, res) => {
  try {
    const { query, trackerid, userid, origin } = req.body;

    if (!origin || !userid)
      return res
        .status(400)
        .json({ message: "Origin and User ID must have a value." });

    // Check if the query already exists in the database
    const isDuplicated = await SearchHistoryModel.findOne({
      userid: userid,
      "history.data.query": query,
    });

    if (isDuplicated)
      return res.status(400).json({ message: "History is already existing." });

    const HistoryParams = {
      origin: origin,
      data: {
        query: query,
        trackerid: trackerid,
      },
    };

    const insertNewHistory = await SearchHistoryModel.updateOne(
      { userid: userid },
      { $push: { history: HistoryParams } },
      { upsert: true }
    );

    return res.status(200).json(insertNewHistory);
  } catch (error) {
    console.error(error);
  }
});

// FOR GETTING THE RECENT HISTORY
app.get("/api/recent_history/:userid", async (req, res) => {
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

  if (recentHistory.length === 0)
    return res.status(404).json({
      message: "No recent Search History was found.",
    });

  return res.status(200).json(recentHistory);
});

// GET THE INDIVIDUAL ITEM API BASED ON THE TRACKER ID IN SEARCH HISTORY
app.get("/api/recent_history/:origin/:trackerid", async (req, res) => {
  const { trackerid, origin } = req.params;

  let response: any;

  if (!trackerid)
    return res.status(400).json({ message: "Provide the trackerid." });

  if (origin === "users") {
    const newId = new mongoose.Types.ObjectId(trackerid.toString());
    const user = await UserModel.findOne(
      { _id: newId },
      { firstname: 1, lastname: 1, imgURL: 1 }
    );
    response = {
      data: {
        results: user,
      },
    };
  } else {
    response = await axios.get(
      `https://www.giantbomb.com/api/game/${trackerid}/?api_key=${APIKEY}`,
      {
        params: {
          format: "json",
          field_list: "name,image",
        },
      }
    );
  }

  return res.status(200).json(response.data.results);
});
