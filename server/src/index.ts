import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { makeApiRequest } from "./utils/utils";
import { MakeAPIRequestProps } from "./utils/types";
import { UserModel } from "./models/User";
import { SearchHistoryModel } from "./models/SearchHistory";

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
    if (!firstname || !lastname || !email || !password || !dateCreated)
      return res.status(400).send({
        message:
          "Send all the required fields: firstname, lastname, email, and password!",
      });

    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      dateCreated: dateCreated,
    };

    const user = await UserModel.create(newUser);

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
  }
});

// // GET SPECIFIC USER
// app.get("/api/search/users/:query?", async (req, res) => {
//   try {
//     const { query } = req.params;

//     let users;

//     if (!query) {
//       users = await User.find({});
//     } else {
//       const queryLowerCased = query.toLowerCase();
//       users = await User.find({ firstname: queryLowerCased });
//     }

//     return res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.get("/api/search/games/:query?", async (req, res) => {
  const { query } = req.params;

  let apiRequestParams: MakeAPIRequestProps;

  const apiKey = process.env.GIANTBOMB_API_KEY2;
  const giantBombAPIURL = "https://www.giantbomb.com/api/games/";

  const commonParams: { field_list: string; limit: number } = {
    field_list: "name,image,platforms,guid,deck",
    limit: 10,
  };

  if (!apiKey)
    return res.status(400).json({
      error: "API KEY IS NOT DEFINED!",
    });

  try {
    apiRequestParams = {
      url: giantBombAPIURL,
      apiKey: apiKey,
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

    // Origin is set to required by default in the SearchHistory Model thus
    // Check if Origin is not present in the request body.
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

  // TODO: I NEED TO MAKE THIS AGGREGATE TO SORT THE ARRAY OF DOCUMENTS BY tiMESTAMP OR ID
  const recentHistory = await SearchHistoryModel.find({ userid: userid }).sort({
    _id: -1,
  });

  const countHistoryEntries = recentHistory.reduce(
    (acc, doc) => acc + doc.history.length,
    0
  );

  if (countHistoryEntries === 0)
    return res.status(404).json({
      message: "No recent Search History was found.",
    });

  return res.status(200).json(recentHistory);
});
