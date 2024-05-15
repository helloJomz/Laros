import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { makeApiRequest } from "./utils/utils";
import { MakeAPIRequestProps } from "./utils/types";
import { UserModel } from "./models/User";
import { SearchHistoryModel } from "./models/SearchHistory";
import { generateDefaultSearch } from "./utils/utils";

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
  .connect(CONNECTION)
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
  const randomId = generateDefaultSearch();
  const giantBombAPIURL = "https://www.giantbomb.com/api/games/";

  const commonParams: { field_list: string; limit: number } = {
    field_list: "name,image,platforms,guid,deck",
    limit: 10,
  };

  try {
    if (!apiKey)
      return res.status(400).json({
        error: "API KEY IS NOT DEFINED!",
      });

    apiRequestParams = {
      url: giantBombAPIURL,
      apiKey: apiKey,
      queryParams: {
        ...commonParams,
        filter: !query ? `id:${randomId}` : `name:${query.toLowerCase()}`,
      },
    };

    const APIResponse = await makeApiRequest(apiRequestParams);
    res.json(APIResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// FOR SEARCH HISTORY
app.post("/api/recent_history", async (req, res) => {
  try {
    const { query, guid, userid, origin } = req.body;

    // Origin is set to required by default in the SearchHistory Model thus
    // Check if Origin is not present in the request body.
    if (!origin)
      return res.status(400).json({ message: "Origin must have a value" });

    // Check if the query already exists in the database
    const isDuplicated = await SearchHistoryModel.findOne({
      query: { $exists: true, $ne: null, $eq: query },
    });

    // If it exists check for GUID, USERID, and QUERY if duplicated
    if (isDuplicated) {
      if (isDuplicated.guid && isDuplicated.guid === guid)
        return res.status(400).json({ message: "Duplicated by GUID" });

      if (isDuplicated.userid && isDuplicated.userid === userid)
        return res.status(400).json({ message: "Duplicated by USERID" });

      return res.status(400).json({ message: "Duplicated by QUERY" });
    } else {
      // If it does not exist check for GUID and USERID instead
      // Check if either guid or userid is set
      // FIXME: its still saves when the guid or userid is duplicated!
      if (guid || userid) {
        // Check if the query already exists in the database with the same GUID or USERID
        const isDuplicateByGuidOrUserId = await SearchHistoryModel.findOne({
          $or: [{ guid: guid }, { userid: userid }],
        });

        if (isDuplicateByGuidOrUserId) {
          if (
            isDuplicateByGuidOrUserId.guid &&
            isDuplicateByGuidOrUserId.guid === guid
          )
            return res.status(400).json({ message: "Duplicated by GUID" });

          if (
            isDuplicateByGuidOrUserId.userid &&
            isDuplicateByGuidOrUserId.userid === userid
          )
            return res.status(400).json({ message: "Duplicated by USERID" });
        }
      }
    }

    const newSearchHistory = {
      query: guid || userid ? undefined : query,
      guid: guid,
      userid: userid,
      origin: origin,
    };

    const SearchHistory = await SearchHistoryModel.create(newSearchHistory);
    return res.status(200).json(SearchHistory);
  } catch (error) {
    console.error(error);
  }
});
