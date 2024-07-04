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
import { CONNECTION, PORT } from "./constants";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
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
