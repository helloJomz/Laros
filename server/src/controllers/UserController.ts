import { Request, Response } from "express";
import { UserModel } from "../models/User";
import mongoose from "mongoose";
import { stringToObjectId } from "../helpers/index";

export const getUserByDisplayNameController = async (
  req: Request,
  res: Response
) => {
  const { displayname } = req.body;

  const user = await UserModel.findOne({ displayname: displayname });

  if (user && displayname !== "") {
    const userObj = {
      userid: user._id,
      displayname: user.displayname,
      email: user.email,
      imgURL: user.imgURL,
      bio: user.bio,
      genre: user.genre,
      heartcount: user.heart?.received.length,
      follower: user.follower.length,
      following: user.following.length,
    };

    return res.status(200).json({ ...userObj });
  } else {
    return res.status(400).json({ message: "User not found" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { userid } = req.query;

  if (userid) {
    const objectUID = stringToObjectId(userid as string);
    const user = await UserModel.findById(objectUID);

    if (user) {
      const userObj = {
        userid: user._id,
        displayname: user.displayname,
        email: user.email,
        imgURL: user.imgURL,
        heartcount: user.heart?.received.length,
        follower: user.follower.length,
        following: user.following.length,
      };
      return res.status(200).json(userObj);
    } else {
      return res.status(400).json({ message: "No user found" });
    }
  } else {
    return res.status(400).json({ message: "User not found" });
  }
};
