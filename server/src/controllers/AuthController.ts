import { Request, Response } from "express";
import { UserModel } from "../models/User";
import {
  ACCESS_TOKEN_STRING,
  REFRESH_TOKEN_STRING,
  REFRESH_SECRET,
  SALT,
} from "../constants";
import { generateToken } from "../helpers/index";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const signupController = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const isExistingUser = await UserModel.findOne({ email: email });

    if (isExistingUser)
      return res.status(400).json({ error: "Email is already taken." });

    const hashedPassword = await bcrypt.hash(password, SALT);

    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    };

    await UserModel.create(newUser);
    return res
      .status(200)
      .json({ message: "Successfully registered an account." });
  } catch (error) {
    console.error(error);
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user)
    return res.status(400).json({ error: "Invalid email or Password." });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const userObj = {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };

  const accessToken = generateToken(userObj, "access", "30m");
  const refreshToken = generateToken(userObj, "refresh", "1d");

  res.cookie(ACCESS_TOKEN_STRING, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 1000,
  });

  res.cookie(REFRESH_TOKEN_STRING, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return res.status(200).json({ message: "Login successfully!" });
};

// export const getUserController = async (req: Request, res: Response) => {
//   const { userid } = req.body;

//   if (!userid) return res.status(401).json({ message: "Missing userid." });

//   const _id = mongoose.Types.ObjectId.createFromHexString(userid);

//   const user = await UserModel.findById(_id);

//   if (!user) return res.status(401).json({ message: "Cannot retrieve user!" });

//   return res.status(200).json({
//     id: user._id,
//     firstname: user.firstname,
//     lastname: user.lastname,
//   });
// };

export const getUserController = async (req: Request | any, res: Response) => {
  const user = req.user;
  return res.json({
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
  });
};
