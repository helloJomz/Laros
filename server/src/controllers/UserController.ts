import { Request, Response } from "express";
import { UserModel } from "../models/User";
import mongoose from "mongoose";

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
      heartcount: user.heartcount.length,
      follower: user.follower.length,
      following: user.following.length,
    };

    return res.status(200).json({ ...userObj });
  } else {
    return res.status(400).json({ message: "User not found" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { uid } = req.body;

  if (uid) {
    const transformedUID = mongoose.Types.ObjectId.createFromHexString(uid);
    const user = await UserModel.findById(transformedUID);

    console.log(user);

    if (user) {
      const userObj = {
        userid: user._id,
        displayname: user.displayname,
        email: user.email,
        imgURL: user.imgURL,
        heartcount: user.heartcount.length,
        follower: user.follower.length,
        following: user.following.length,
      };
      return res.status(200).json({ ...userObj });
    } else {
      return res.status(400).json({ message: "No user found" });
    }
  } else {
    return res.status(400).json({ message: "User not found" });
  }
};

export const incrementHeartCountOnProfileController = async (
  req: Request,
  res: Response
) => {
  const { yourUID, otherUserUID } = req.body;

  try {
    if (yourUID && otherUserUID) {
      const transformedYourUID =
        mongoose.Types.ObjectId.createFromHexString(yourUID);
      const transformedOtherUserUID =
        mongoose.Types.ObjectId.createFromHexString(otherUserUID);

      const findUserYouLiked = await UserModel.findById(
        transformedOtherUserUID
      );

      if (findUserYouLiked) {
        // Check if the uid exists in the heartcount array
        const uidIndex = findUserYouLiked.heartcount.findIndex(
          (item) =>
            item.uid && item.uid.toString() === transformedYourUID.toString()
        );

        if (uidIndex !== -1) {
          // Remove the uid if it exists
          findUserYouLiked.heartcount.splice(uidIndex, 1);
        } else {
          // Add the uid if it does not exist
          findUserYouLiked.heartcount.push({ uid: transformedYourUID });
        }

        await findUserYouLiked.save();

        return res.status(200).json({ message: "success liked" });
      }
    } else {
      res.status(400).json({ message: "No UIDs were sent!" });
    }
  } catch (error) {
    console.error(error);
  }
};
