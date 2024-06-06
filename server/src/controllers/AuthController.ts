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
    maxAge: 30 * 60 * 1000,
  });

  res.cookie(REFRESH_TOKEN_STRING, refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    gqeRxt3B9mZ2i: {
      ks23kfm: accessToken,
      sdCXkm122: refreshToken,
    },
    userid: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
  });
};

export const refreshTokenController = async (
  req: Request | any,
  res: Response
) => {
  const { gqeRxt3B9mZ2i: accessToken, ui9832mmXk21: refreshToken } =
    req.cookies;

  if (!accessToken || !refreshToken)
    return res.status(401).json({ message: "Forbidden Access!" });

  jwt.verify(refreshToken!, REFRESH_SECRET!, (err: any, decoded: any) => {
    if (err) return res.status(401).json({ message: "Forbidden Access!" });
    const data = decoded.user;
    const newUserObj = {
      _id: data._id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    };
    const accessToken = generateToken(newUserObj, "access", "30m");
    return res
      .status(200)
      .cookie(ACCESS_TOKEN_STRING, accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 60 * 1000,
      })
      .json({ gqeRxt3B9mZ2i: accessToken });
  });
};

export const testController = async (req: Request | any, res: Response) => {
  return res.status(401).json({ message: "testing" });
};
