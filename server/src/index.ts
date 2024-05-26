import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { default as searchRouter } from "./routes/search";
import { default as userRouter } from "./routes/users";

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

app.use("/api/search", searchRouter);
app.use("/api/users", userRouter);
