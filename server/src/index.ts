import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { makeApiRequest } from "./utils/utils";
import { MakeAPIRequestProps } from "./utils/types";
import mongoose from "mongoose";
import { User } from "./models/User";
import { generateDefaultSearch } from "./utils/utils";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

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

    const user = await User.create(newUser);

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
    if (!apiKey) {
      return res.status(400).json({
        error: "API KEY IS NOT DEFINED!",
      });
    }

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

const CONNECTION = process.env.MONGODBCREDENTIALS;
const PORT = process.env._PORT || 3000;

if (!CONNECTION) {
  console.error("Error: MONGODBURL environment variable is not defined.");
  process.exit(1);
}

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
