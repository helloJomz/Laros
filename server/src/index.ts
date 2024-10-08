import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { default as searchRouter } from "./routes/search";
import { default as authRouter } from "./routes/auth";
import { default as giphyRouter } from "./routes/giphy";
import { default as uploadRouter } from "./routes/upload";
import { default as userRouter } from "./routes/user";
import { default as profileRouter } from "./routes/profile";
import { default as postRouter } from "./routes/post";
import { default as gameRouter } from "./routes/game";
import { CONNECTION, PORT } from "./constants";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(cookieParser());

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
app.use("/api/auth", authRouter);
app.use("/api/giphy", giphyRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/post", postRouter);
app.use("/api/game", gameRouter);
