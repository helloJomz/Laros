import { Request, Response } from "express";
import {
  REFRESH_SECRET,
  ACCESS_TOKEN_STRING,
  REFRESH_TOKEN_STRING,
} from "../constants";
import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import { generateToken } from "../helpers";

export const refreshTokenController = async (
  req: Request | any,
  res: Response
) => {
  const cookies = req.cookies;
  const refreshToken: string = cookies[REFRESH_TOKEN_STRING];

  // TODO: I NEED TO CHECK THIS AND HANDLE THIS BECAUSE IF THE COOKIE
  //       IS NOT SET ANYMORE I SHOULD REDIRECT THE USER TO THE LOGIN PAGE (401)
  if (!refreshToken)
    return res.status(401).json({ message: "Forbidden Access!" });

  jwt.verify(refreshToken, REFRESH_SECRET!, (err: any, user: any) => {
    if (err) return res.status(401).json({ message: "Forbidden Access!" });
    const newUserObj = {
      _id: user._id,
      firstname: user.user.firstname,
      lastname: user.user.lastname,
      email: user.user.email,
    };
    const accessToken = generateToken(newUserObj, "access", "30m");
    return res
      .cookie(ACCESS_TOKEN_STRING, accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Successfully generated access token!" });
  });
};
