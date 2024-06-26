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
import { generateRandomAvatarGifs } from "../helpers/index";

export const signupController = async (req: Request, res: Response) => {
  const { displayname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT);
    const randomGif = generateRandomAvatarGifs();

    const newUser = {
      displayname: displayname,
      email: email,
      password: hashedPassword,
      imgURL: randomGif,
    };

    const user = await UserModel.create(newUser);

    if (user) {
      const userObj = {
        _id: user._id,
        displayname: user.displayname,
        email: user.email,
        imgURL: randomGif,
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
        userObj,
      });
    }
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
    displayname: user.displayname,
    email: user.email,
    ...(user.imgURL !== undefined && { imgURL: user.imgURL }),
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
    userObj,
  });
};

export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("gqeRxt3B9mZ2i");
  res.clearCookie("ui9832mmXk21");
  return res.status(200).json({
    message: "Successfully logged out!",
  });
};

export const isEmailExistsController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const isExistingEmail = await UserModel.findOne({ email: email });

    if (isExistingEmail)
      return res.status(400).json({ error: "Email is already taken." });

    return res.status(200).json({ success: "Email is available." });
  } catch (error) {
    console.error(error);
  }
};

export const isDisplayNameExistsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { displayname } = req.body;

    const isExistingDisplayName = await UserModel.findOne({
      displayname: displayname,
    });

    if (isExistingDisplayName)
      return res.status(400).json({ error: "Display name is already taken." });

    return res.status(200).json({ success: "Display name is available." });
  } catch (error) {
    console.error(error);
  }
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
      displayname: data.displayname,
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
