import { Request, Response } from "express";
import { UserModel } from "../models/User";
import mongoose from "mongoose";

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
        const uidIndex = findUserYouLiked.heart.findIndex(
          (item) =>
            item.uid && item.uid.toString() === transformedYourUID.toString()
        );

        if (uidIndex !== -1) {
          // Remove the uid if it exists
          findUserYouLiked.heart.splice(uidIndex, 1);
        } else {
          // Add the uid if it does not exist
          findUserYouLiked.heart.push({ uid: transformedYourUID });
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

export const incrementFollowerCountOnProfileController = async (
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

      const findUserYouFollowed = await UserModel.findById(
        transformedOtherUserUID
      );

      const findUserWhoFollowed = await UserModel.findById(transformedYourUID);

      if (findUserYouFollowed && findUserWhoFollowed) {
        // Check if the uid exists in the follower array
        const uidIndex = findUserYouFollowed.follower.findIndex(
          (item) =>
            item.uid && item.uid.toString() === transformedYourUID.toString()
        );

        const otherUidIndex = findUserWhoFollowed.following.findIndex(
          (item) =>
            item.uid &&
            item.uid.toString() === transformedOtherUserUID.toString()
        );

        if (uidIndex !== -1) {
          // Remove the uid if it exists
          findUserYouFollowed.follower.splice(uidIndex, 1);
          findUserWhoFollowed.following.splice(otherUidIndex, 1);
        } else {
          // Add the uid if it does not exist
          findUserYouFollowed.follower.push({ uid: transformedYourUID });
          findUserWhoFollowed.following.push({ uid: transformedOtherUserUID });
        }

        await findUserYouFollowed.save();
        await findUserWhoFollowed.save();

        return res.status(200).json({ message: "success liked" });
      }
    } else {
      res.status(400).json({ message: "No UIDs were sent!" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addBioController = async (req: Request, res: Response) => {
  try {
    const { yourUID, bio } = req.params;
    if (yourUID && bio) {
      console.log(yourUID, bio);
    } else {
      return res
        .status(400)
        .json({ message: "Cannot proceed on adding your bio." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkProfileRelationshipStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { yourUID, otherUserUID } = req.params;
    if (yourUID && otherUserUID) {
      const transformedYourUID =
        mongoose.Types.ObjectId.createFromHexString(yourUID);
      const transformedOtherUserUID =
        mongoose.Types.ObjectId.createFromHexString(otherUserUID);

      const isHeart = await UserModel.findOne({
        _id: transformedOtherUserUID,
        "heart.uid": transformedYourUID,
      });

      const isFollowing = await UserModel.findOne({
        _id: transformedOtherUserUID,
        "follower.uid": transformedYourUID,
      });

      return res
        .status(200)
        .json({ heart: !!isHeart, following: !!isFollowing });
    }
  } catch (error) {
    console.log(error);
  }
};
